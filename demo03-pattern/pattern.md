
### 单例模式 Singleton
一个类只有一个实例, 并提供一个获得该实例的全局访问点。

一个简单的思路就是用静态方法封装new语句。判断实例是否存在, 如果不存在则用new语句创建实例。

用途: 一些名为context上下文的实例, 可能会用到它。

```js
class Singleton {
    static instance: undefined;
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```


### 适配器模式
当一个接口无法访问时, 将一个类的接口转化为另一个接口, 称之为适配器。

```js
class Plug {
    getName() {
        return "Plug"
    }
}
class Adapt {
    constructor() {
        this.plug = new Plug();
    }
    getName() {
        reurn this.plug.getName() + "Adapt"
    }
}
```

> 看上去和代理类似, 区别在于适配器用于接口无法调用的问题, 代理解决接口不好用的问题。

### 装饰者模式
为一个可以访问的接口添加一些额外的功能。
```js
class CellPhone {
    create() {
        console.log("generate a phone");
    }
}
class Decorator {
    constructor(cellphone) {
        this.cellphone = cellphone;
    }
    create() {
        this.cellphone.create();
        this.createShell(cellphone);
    }
    createShell() {
        console.log("generate a shell")
    }
}
```

> 看上去和适配器类似, 但是增强了接口的功能。

### 代理模式
为一个可以访问的接口添加代理, 由代理对象控制如何访问该接口。
```js
let allen = {
    sendFlower: (receive_people) => {
        receive_people.receiveFlower();
    }
}
let Alice = {
    receiveFlower: () => {
    }
}
let Proxy = {
    receiveFlower: () => {
        if (Alice.hasFreeTime()) {
            Alice.receiveFlower();
        }
    }
}
allen.sendFlower(Proxy); // 使用代理
allen.sendFlower(Alice); // 不适用代理
```

### 外观模式 Facade
为分一系列接口提供一个一致的访问点。
```js
class BussinessFacade {
}
class ModelFacade {
}
class ViewFacade {
}
```
> 常用于分层架构, 每一层访问另一层时使用Facade
> 在设计初期, 开发阶段和维护阶段, Facade都是一个很好的设计模式。
> 但由于不符合开闭原则, 编写Facade时应该注意简洁明了。否则Facade将会很快变成一个臃肿的对象。

### 观察者模式
提供了一对多关系, 让观察者监听某一个主题, 当主题状态改变时, 更新所有观察者对象。
> 缺点: 过度使用, 会导致对象于对象之间的联系弱化。

### 状态模式
对象的内部状态改变时, 直接改变类的行为, 就像是改变了一个类一样。
> 优点是: 状态与状态互不干扰。

### 迭代器模式
提供一种方法, 为遍历不同的集合提供一个统一的接口。

### 桥接模式
将抽象部分与它的实现部分分离, 使它们可以独立变化。


### 组合模式
将多个对象组合起来。或者说将一个对象的多个功能, 按功能拆分为多个对象, 最后组合成一个对象里面。并且希望调用者不能访问根据功能拆分的对象, 而只能访问组合后的对象。

### 原型模式
是指用原型实例指向创建对象的种类, 并通过拷贝这种原型创建新的对象。
原型模式就是创建一个共享的对象, 通过复用或者拷贝来创建新的对象, 用于创建重复的对象, 使用原型模式可以带来性能上的提升。

### 策略模式
定义一系列的算法, 将他们封装起来, 使它们可以相互替换。
> 缺点: 使用时, 必须了解每一个策略, 才能选出合适的策略。

### 享元模式


### 模板方法模式


### 职责链模式


### 命令模式
将请求封装成一个命令对象, 然后用一个process()函数来执行命令。这样做可以极大程度的解耦处理逻辑, 保证各个命令之间互不干扰。
> 缺点是, 随着业务增加, 真的需要写很多很多命令类。


### 备忘录模式

### 中介者模式


### 解释器模式


### 访问者模式


### 工厂模式
```js
class Product {
    constructor() {
        this.name = name;
    }
}
class Factory {
    create(name) {
        return new Product(name);
    }
}
```
> 当new一个对象时, 需要执行一些复杂的初始化逻辑, 但如果有不适合写在构造函数内的逻辑, 就可以考虑使用工厂模式。

