# 记录

[Page hosted on GitHub](https://xinntao.github.io/records/) | [Page hosted on Gitee码云](https://xinntao.gitee.io/records/) <br>
[GitHub](https://github.com/xinntao/records) | [Gitee码云](https://gitee.com/xinntao/records)

记录平时遇到的问题和解决方法.

> [!TIP]
> 本仓库在 [GitHub](https://github.com/xinntao/records) 和 [Gitee码云](https://gitee.com/xinntao/records) 同步. 欢迎在 [Github](https://github.com/xinntao/records) 或 [Gitee码云](https://gitee.com/xinntao/records) 贡献.

---

> [!NOTE]
> - Github pages will automatically update the contents in `gh-pages`.
> - Gitee pages **require manual** updates.

---

> [!COMMENT|label: Usage]
> 1. File structure
> Run the following two commands in the same root folder.
>     ```
>     git clone git@github.com:xinntao/records.git
>     git clone -b gh-pages git@github.com:xinntao/records.git records-gh-pages
>     ```
>     The file structure should be like this:
>     ```
>     - root
>     |--- records
>     |--- records-gh-pages
>     ```
>     Note that in order to trigger the GitHub actions, we should also copy the `.github` folder to the records-gh-pages branch for the fist time.
> 1. Update the master branch in the `records` folder.
> 1. Build the gitbook: `gitbook build`
> 1. In the `records` repo, copy the contents in `_book` folder to `records-gh-pages`: `cp -r _book/* ../records-gh-pages`
> 1. Push to remotes:
>     - For records: `git push origin master`
>     - For records-gh-pages: `git push origin gh-pages`