# JavaScript Quiz Game

This project is part of my coding challenges video series.

I use plain "vanilla" javascript to create this project with a hint of HTML and css here and there. 😉

Used Languages:
- HTML
- CSS
- Javascript
- JSON

IDE: VSCode

**You can check out my video series from [My Youtube Channel!](https://www.youtube.com/channel/UCRDHTKI4CdWruExooizDMRw)**

---

## Installion
1. Clone project.
2. Install npm package 'serve'.
3. run with command `serve`

If you get **error** when running serve command, like so:
```console
...is not digitally signed. You cannot run this script on the current system. For more information about running scripts and setting execution policy, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ serve
+ ~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```
**use this** command in the command line/powershell to **bypass** the security issue:
```console
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## What i learned

I developed my skills further with plain JavaScript.

I learned to create elements **dynamically** with `document.createElement("div");`.
I also learned more about waits and transitions in css.

```javascript
setTimeout(() => {
    //function()
    el.style.opacity = 1;
    }, 400);
});
```
