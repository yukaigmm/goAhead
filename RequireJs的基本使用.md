# RequireJs的基本使用
​	requireJS是js模块化开发的一个加载器。为什么要使用模块化开发呢？随着前端开发代码量的增加，一个js文件是不够用的，那么就需要分成很多个文件，依次加载，如下代码所示：

```html
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<script src="4.js"></script>
<script src="5.js"></script>
<script src="6.js"></script>
<script src="7.js"></script>
```

​	这样的写法有很大的缺点，首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的1.js要在2.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

​	模块化开发的好处（1）实现js文件的异步加载，避免网页失去响应；（2）管理模块之间的依赖性，便于代码的编写和维护。

## 1. 下载requireJs

​	首先去官网下载requireJs的库文件，官网地址http://requirejs.org/

## 2. 新建一个模块化文件

​	在文件夹新建一个js文件，文件的用途是模块化编写代码。比如，我将文件命名为teacherManage.js，说明我将在这个模块内进行老师管理业务逻辑的编写。

​	js文件内使用define进行定义业务逻辑。define的第一个参数是一个数组，数组内的元素数据类型都应该是字符串，具体语义是define的这个模块将调用的其他模块的文件路径。比如例子中我们调用了jQuery和teacherAdd模块。第二个参数是一个回调函数，回调函数的形参将接收前面对应的调用模块的函数返回值。这种方式叫做依赖注入。

```Javascript
define(["../jquery-2.1.4.js", "teacherAdd"], function ($, teacherAdd) {
    return function () {
        $("<div class='teacherMain'><button>增加教师</button></div>").css({
            width: 300,
            height: 300,
            border: "1px solid red"
        }).appendTo($("body")).on("click", "button", function () {
            teacherAdd();
        })

    }
})
```

### (1) 回调函数的形参

​	关于回调函数的形参问题，形参接收返回值是按照前面的数组中元素的顺序来进行的，因此对于顺序是不能随意书写的，如果前面的数组中模块之间的书写位置发生变化，那么后面接收参数的顺序也将发生变化。

​	其次，回调函数的形参最好对应的有语义，最好与前面的模块同名，以便于函数内部的调用，以免发生错乱。例如jQuery的对应的形参是该插件特有的$符号，teacherAdd对应的的形参是同名的teacherAdd。在调用模块化函数的时候，有的函数没有返回值，这样的函数一般放在数组的后面，对应的回调函数也不需要用形参去接收返回值。

​	那么，用形参接收返回值的意义在哪里呢？直接在回调函数里面写业务逻辑不行吗？实际上，通过形参传入模块的返回值，这叫做依赖注入，在某些特定的场合可以精确地区分导入模块的变量命名出现的冲突问题。

​	比如，我同时导入了jQuery和zepto，如果不通过回调函数的形参去接收模块的返回值的话，直接在回调函数体写$,那到底指向的是jQuery对象呢还是zepto的对象呢？这样就会出现混淆。因此使用依赖注入的方式可以有效地避免这些情况的发生。

### （2）函数体的内容

​	回调函数的函数体内的代码，如果直接书写，那么该模块被调用的时候就直接会执行，一般我们的业务需求是代码在某些特定的情景下才能执行，因此有这方面需求的代码需要保存在函数的返回值里面，在调用该模块的函数内部设置符合代码执行的条件。比如上面代码中的teacherAdd模块，在传入teacherManage之后通过回调函数的参数接收，设置为当页面中按钮被点击的时候再执行。

## 3. 新建一个入口文件

在项目模块化组件的js文件夹新建一个main.js的入口文件，使用require入口，导入teacherManage模块，使用回调函数的形参teacherManage来接收模块的返回值，然后再在函数体调用，这样就能实现业务功能的模块化，从而达到模块化编程的目的。

```javascript
require(["teacherManage"], function (teacherManage) {
    teacherManage()
})
```

​	require的语法和define基本一致，都是前面的数组引入模块（以字符串的形式书写模块的路径），后面的回调函数通过形参接收前面对应的模块的返回值。

## 4.引入RequireJS文件和入口文件 

​	在html文件页面通过script标签的src属性引入RequireJS文件，通过data-main属性引入入口文件main.js。main.js的文件拓展名可以省略。这样可以实现一行就导入组件，不用两个script标签。

```javascript
<script src="../require.js" data-main="main"></script>
```

## 5. AMD规范的问题 

​	AMD规范可以简单地理解为，该模块在调用时，是否会有返回值。也就是说，如果该模块支持AMD规范，那么在使用RequireJS调用该模块时，能够通过回调函数的形参接收模块的返回值。

​	判断外部引用的库文件是否支持AMD规范，可以在库文件的源码中查找类似于如下的代码：

```javascript
if (typeof define === "function" && define.amd) {
    define([], function () {
        //函数体
    });
}
```
## 6. 模块路径的设置

​	一般使用模块开发的项目都是模块较多，因此会使用require.baseUrl来统一设置模块的路径。

在下面的代码中，所有的文件都从js目录开始查找。此外，还能在**设置基本路径的基础上**使用paths给单个的文件和文件夹设置路径，储存在变量中，比如将a.js 的路径设置为a，要是有模块调用a.js，就能直接写a就可以。

```javascript
require.config({
    baseUrl: "./js",
    paths: {
        a: "asset/a",
        jquery:"../jquery-2.1.4",
        bootstrap:"../bootstrap/js/bootstrap"
    }
})
```

## 7. shim的使用

​	有时候我们需要导入多个外部库文件，有的不支持AMD标准，而这样的库文件又是基于某些支持AMD的库文件的，比如，bootstrap不支持AMD，但是bootstrap又是基于jQuery的，jQuery支持AMD，如果模块化需要使用bootstrap的组件，那么使用起来就很麻烦。通过shim能比较好的解决这种问题，通过shim，可以告诉浏览器bootstrap是基于jQuery的，因此会在jQuery加载之后再执行bootstrap的内容，这样就不会报错了。

```javascript
require.config({
    shim:{
        bootstrap:{
            deps:["jquery"]
        }
    }
})
```

