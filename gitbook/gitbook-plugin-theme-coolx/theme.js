require(['gitbook', 'jQuery'], function (gitbook, $) {

  const TERMINAL_HOOK = '**[terminal]'

  var pluginConfig = {}; // 该插件配置
  var opts; // 配置的 隐藏元素 数组
  var timeouts = {};

  function getRootPath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    if (webName == "") {
      return window.location.protocol + '//' + window.location.host;
    } else {
      return window.location.protocol + '//' + window.location.host + '/' + webName;
    }
  }

  // 生成内容导航
  function generateSectionNavigator() {
    $(".page-inner .markdown-section").find("h1,h2,h3").each(function () {
      var cls = "anchor-h1";
      if ($(this).is("h2")) {
        cls = "anchor-h2";
      }
      if ($(this).is("h3")) {
        cls = "anchor-h3";
      }
      var text = $(this).text();
      var href = $(this).attr("id");
      $(".book-anchor-body").append("<a id='an_" + text + "' class='anchor-text " + cls + "' title='" + text + "'  href='#" + href + "'>" + text + "</a>")
    });

    $(".book-anchor-title").click(function () {
      // $(".book-anchor-body").toggle();
    });

    $(".book-anchor-body>a").click(function () {
      $(".book-anchor-body>a").removeClass("selected");
      $(this).addClass("selected");
    });

    // 获取hash值定向到指定位置
    var hash = decodeURIComponent(location.hash);
    if (hash) {
      hash = hash.substring(1);
      $("#an_" + hash).addClass("selected");
    }

  }

  // 基础设置
  function setBase() {

    // 标题
    var $title = $(".header-inner .title");
    $title.text(gitbook.state.config.title);

    // 搜索框
    var $search = $('#book-search-input');
    var placeholder = pluginConfig["search-placeholder"] || "输入关键字搜索"
    $search.find("input").attr("placeholder", placeholder);
    $search.append("<span id='searchBtn'>搜索</span>");
    $search.focus();
    $("#searchBtn").click(function (e) {
    });

    // 返回顶部按钮
    var $bookTotop = ['<div class="book-toTop"><i class="fa fa-arrow-up"></i></div>'].join("");
    $(".book").append($bookTotop)
    $(".book-toTop").hide();
    $('.book-body,.body-inner').on('scroll', function () {
      if ($(this).scrollTop() > 100) {
        $('.book-toTop').fadeIn();
      } else {
        $('.book-toTop').fadeOut();
      }
    });
    $('.book-toTop').click(function () {
      $('.book-body,.body-inner').animate({
        scrollTop: 0
      }, 800);
      return false;
    });

    // 隐藏元素, 比如去掉gitbook-link
    $.map(opts, function (ele) {
      $(ele).hide();
    });
  }

  /**
   * 代码添加行号&复制按钮
   */
  function addCopyButton(wrapper) {
    wrapper.append(
      $('<i class="fa fa-clone t-copy"></i>')
        .click(function () {
          copyCommand($(this));
        })
    );
  }

  function addCopyTextarea() {
    // 允许添加复制的文本区域
    $('body').append('<textarea id="code-textarea" />');
  }

  function copyCommand(button) {
    pre = button.parent();
    textarea = $('#code-textarea');
    textarea.val(pre.text());
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    pre.focus();
    updateCopyButton(button);
  }

  function format_code_block(block) {
    // 为多行块添加行号
    code = block.children('code');
    lines = code.html().split('\n');

    if (lines[lines.length - 1] == '') {
      lines.splice(-1, 1);
    }

    if (pluginConfig.copyLines && lines.length > 1) {
      // console.log(lines);
      lines = lines.map(line => '<span class="code-line">' + line + '</span>');
      // console.log(lines);
      code.html(lines.join('\n'));
    }

    // 将包装器添加到pre元素
    wrapper = block.wrap('<div class="code-wrapper"></div>');
    if (pluginConfig.copyButtons) {
      addCopyButton(wrapper);
    }
  }

  function updateCopyButton(button) {
    id = button.attr('data-command');
    button.removeClass('fa-clone').addClass('fa-check');
    if (id in timeouts) {
      clearTimeout(timeouts[id]);
    }
    timeouts[id] = window.setTimeout(function () {
      button.removeClass('fa-check').addClass('fa-clone');
    }, 1000);
  }

  /**
   * 在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度
   */
  function setSplitter() {
    var KEY_SPLIT_STATE = 'plugin_gitbook_split';

    var dividerWidth = null;
    var isDraggable = false;
    var dividerCenterOffsetLeft = null;
    var splitState = null;
    var grabPointWidth = null;

    var $body = $('body');
    var $book = $('.book');
    var $summary = $('.book-summary');
    var $bookBody = $('.book-body');
    var $divider = $('<div class="divider-content-summary">' +
      '<div class="divider-content-summary__icon">' +
      '<i class="fa fa-ellipsis-v"></i>' +
      '</div>' +
      '</div>');

    $summary.append($divider);

    dividerWidth = $divider.outerWidth();
    dividerCenterOffsetLeft = $divider.outerWidth() / 2;

    // restore split state from sessionStorage
    splitState = getSplitState();
    setSplitState(
      splitState.summaryWidth,
      splitState.summaryOffset,
      splitState.bookBodyOffset
    );

    setTimeout(function () {
      var isGreaterThanEqualGitbookV2_5 = !Boolean($('.toggle-summary').length);

      var $toggleSummary = isGreaterThanEqualGitbookV2_5
        ? $('.fa.fa-align-justify').parent() : $('.toggle-summary');

      $toggleSummary.on('click', function () {

        var summaryOffset = null;
        var bookBodyOffset = null;

        var isOpen = isGreaterThanEqualGitbookV2_5
          ? !gitbook.sidebar.isOpen() : $book.hasClass('with-summary');

        if (isOpen) {
          summaryOffset = -($summary.outerWidth());
          bookBodyOffset = 0;
        } else {
          summaryOffset = 0;
          bookBodyOffset = $summary.outerWidth();
        }

        setSplitState($summary.outerWidth(), summaryOffset, bookBodyOffset);
        saveSplitState($summary.outerWidth(), summaryOffset, bookBodyOffset);
      });
    }, 1);

    $divider.on('mousedown', function (event) {
      event.stopPropagation();
      isDraggable = true;
      grabPointWidth = $summary.outerWidth() - event.pageX;
    });

    $body.on('mouseup', function (event) {
      event.stopPropagation();
      isDraggable = false;
      saveSplitState(
        $summary.outerWidth(),
        $summary.position().left,
        $bookBody.position().left
      );
    });

    $body.on('mousemove', function (event) {
      if (!isDraggable) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      $summary.outerWidth(event.pageX + grabPointWidth);
      $bookBody.offset({ left: event.pageX + grabPointWidth });
    });

    function getSplitState() {
      var splitState = JSON.parse(sessionStorage.getItem(KEY_SPLIT_STATE));
      splitState || (splitState = {});
      splitState.summaryWidth || (splitState.summaryWidth = $summary.outerWidth());
      splitState.summaryOffset || (splitState.summaryOffset = $summary.position().left);
      splitState.bookBodyOffset || (splitState.bookBodyOffset = $bookBody.position().left);
      return splitState;
    }

    function saveSplitState(summaryWidth, summaryWidthOffset, bookBodyOffset) {
      sessionStorage.setItem(KEY_SPLIT_STATE, JSON.stringify({
        summaryWidth: summaryWidth,
        summaryOffset: summaryWidthOffset,
        bookBodyOffset: bookBodyOffset,
      }));
    }

    function setSplitState(summaryWidth, summaryOffset, bookBodyOffset) {
      $summary.outerWidth(summaryWidth);
      $summary.offset({ left: summaryOffset });
      $bookBody.offset({ left: bookBodyOffset });
      // improved broken layout in windows chrome.
      //   "$(x).offset" automatically add to "position:relative".
      //   but it cause layout broken..
      $summary.css({ position: 'absolute' });
      $bookBody.css({ position: 'absolute' });
    }
  }

  gitbook.events.on('start', function (e, config) {
    pluginConfig = config['theme-coolx'];
    opts = pluginConfig["hide-elements"];

    if (pluginConfig.copyButtons) {
      addCopyTextarea();
    }
  });

  gitbook.events.on('page.change', function () {
    setBase();

    var isLargeScrenn = screen.width > 768 ? true : false;
    if (isLargeScrenn) {
      generateSectionNavigator();
    }
    else {
      document.getElementById("my-book-anchor").style.width = "0px";
      document.getElementById("my-book-anchor").style.padding = "0px 0px 0px 0px";
      document.getElementById("my-book-anchor").style.borderLeft = "0px";
      document.getElementById("my-page-inner").style.paddingLeft = "10px";
      document.getElementById("my-page-inner").style.paddingRight = "10px";
    }

    $('pre').each(function () {
      format_code_block($(this));
    });

    if (pluginConfig.dragSplitter) {
      setSplitter();
    }
  });
});
