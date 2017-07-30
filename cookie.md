# cookie

## 1. cookie 在原生js的创建和调用

### cookie的创建

​		cookie的创建方式就是直接赋值，使用document.cookie =xxx;的方式，赋值等号右边是字符串型的数据，格式为name=value的形式。

```javascript
document.cookie="age=18;expires="+new Date("2017-07-30 20:00:00");//创建长期cookie
document.cookie = "userName=jack";//创建会话cookie
```

### cookie的调用


​		cookie的调用也直接使用document.cookie进行调用，根据业务逻辑进行调用。

```javascript
document.cookie = "userName=jack";
console.log(document.cookie);
```

​		由于所有的cookie都储存在cookie中，因此声明多个cookie时就继续使用赋值的方式，调用的时候需要进行处理，这样处理起来比较麻烦，jQuery封装了一个cookie的插件，可以方便的创建和调用符合业务需求的cookie。

## 2. cookie在jQuery插件中的创建和使用

​		使用jQuery创建cookie，需要引入jQuery的cookie插件。cookie的设置、获取以及删除如下代码所示。

```javascript
//1、设置会话cookie：
$.cookie("gender","男");
//2、获取cookie：
console.log($.cookie("gender"));

//3、设置长期cookie
$.cookie("length","180",{expires:7});       //相对于当前设置的时间，7天后过期

$.cookie("width","200",{expires:0.1});       //2.4h后过期

//4、删除cookie
$.removeCookie("width");
```