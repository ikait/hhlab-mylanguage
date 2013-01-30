// スタイルシートの設定を行う関数で使用するクラス
var Style = function () {
  this.selectors = [];
  console.log("さあ始めるよ！");
};
// セレクタをセット
Style.prototype.setSelector = function (selectorName) {
  // すでにそのセレクタが登録されていなければ追加
  // 1. はじめてのセレクタの場合は配列に入れる
  if (this.selectors.length === 0) {
    this.addSelector(selectorName);
  } else {
    // 既に配列に入っているものを調べて、入っていなければ入れる
    if (!this.getSelectorObject(selectorName)) {
      this.addSelector(selectorName);
    } else {
      console.log("このセレクタ(" + selectorName + ")はもう登録されているよ");
    }
  }
};
// セレクタを追加
Style.prototype.addSelector = function (selectorName) {
  var selector = new Selector(selectorName);
  selector.Style = this;
  this.selectors.push(selector);
};
// セレクタの状態変更を一手に引き受ける関数
// 第1引数: セレクタ名 2: property / offsets / size 3: 変更する値の項目名 4; 変更する値
Style.prototype.setSelectorValue = function (selectorName, type, name, value) {
  // まずはそのセレクタがあるかどうかを調べる
  this.setSelector(selectorName);
  // あれば(作ったら)、プロパティを追加する
  if (this.getSelectorObject(selectorName)) {
    if (type == "property") {
      this.getSelectorObject(selectorName).setProperty(name, value);
    } else if (type == "offset") {
      this.getSelectorObject(selectorName).setOffset(name, value);
    } else if (type == "size") {
      this.getSelectorObject(selectorName).setSize(name, value);
    }
  }
};
// セレクタ名を引数で受けて、配列の中から該当するセレクタのオブジェクトを返す
Style.prototype.getSelectorObject = function (selectorName) {
  for (var i = 0, j = this.selectors.length; i < j; i++) {
    if (this.selectors[i].name == selectorName) {
      return this.selectors[i];
    }
  }
};
// スタイルを書き出してその文字列を返す
Style.prototype.write = function () {
  var str = "";
  for (var i = 0, j = this.selectors.length; i < j; i++) {
    str += this.selectors[i].name + " {\n";
    for (var k = 0, l = this.selectors[i].property.length; k < l; k++) {
      str += "  " + this.selectors[i].property[k].name + ":";
      str += " " + this.selectors[i].property[k].value + ";\n";
    }
    str += "}\n";
  }
  this.animate();
  return str;
};
// スタイル変更をアニメートする
Style.prototype.animate = function () {
  for (var i = 0, j = this.selectors.length; i < j; i++) {
    var s = {};
    for (var k = 0, l = this.selectors[i].property.length; k < l; k++) {
      s[this.selectors[i].property[k].name] = this.selectors[i].property[k].value;
    }
    $(this.selectors[i].name)
      .animate(s, {queue: false, duration: 200, easing: 'swing'}).removeAttr("style");
  }
};
// セレクタについて
var Selector = function (selectorName) {
  this.name = selectorName;
  this.property = [];
  this.offset = {};
};
// プロパティを追加
Selector.prototype.setProperty = function (propertyName, propertyValue) {
  // プロパティが存在していない場合(通常)
  if (!this.getPropertyObject(propertyName)) {
    var p = {
      name: propertyName,
      value: propertyValue
    };
    this.property.push(p);
  } else { // すでにプロパティが存在していた場合は引数で指定された値で上書き
    this.getPropertyObject(propertyName).value = propertyValue;
  }
};
Selector.prototype.setOffset = function (position, value) {
  this.offset[position] = value;
  console.log(this.offset[position]);
};
Selector.prototype.setSize = function (which, value) {
  if (which.toLowerCase() == "width") {
    this.width = value;
  } else if (which.toLowerCase() == "height") {
    this.height = value;
  }
};
// プロパティ名を引数で受けて、配列の中から該当するプロパティのオブジェクトを返す
Selector.prototype.getPropertyObject = function (propertyName) {
  for (var i = 0, j = this.property.length; i < j; i++) {
    if (this.property[i].name == propertyName) {
      return this.property[i];
    }
  }
};

var style = new Style();
var $tag;

var builtin_ikait = function (env) {
  console.log(env);
  env.defBuiltinFunc('setCSS', function () {
    // 第1引数にセレクタを、第2引数以降にプロパティを指定する
    var s = arguments[0], p = "";
    // styleタグがあるかどうかを確認、無ければ追加
    if (!$tag) {
      $tag = $('<style />');
      $('body').append($tag);
    }
    // 引数を順々にプロパティにセット
    for (var i = 1, j = arguments.length; i < j; i++) {
      var k = arguments[i].split(/;[\s\n　]*/g);
      k.forEach(function (v, i) {
        var l = v.split(/\s*[\:\;]\s*/g, 2);
        style.setSelectorValue(s, "property", l[0], l[1]);
      });
    }

    console.log(style);
    // スタイルを書きだす
    $tag.html(style.write());
  });
  env.defBuiltinFunc('getCSS', function () {
    // 第1引数にセレクタを、第2引数以降にプロパティを指定する
    if (arguments.length == 1) {
      var properties = style.getSelectorObject(arguments[0]).property;
      var r = arguments[0] + " {\n";
      properties.forEach(function(v, i) {
        r += "  " + v.name + ": " + v.value + ";\n";
      });
      r += "}\n";
      return r;
    } else if (arguments.length == 2) {
      var s = arguments[0], p = arguments[1];
      var o = style.getSelectorObject(s).getPropertyObject(p);
      return o.value;
    }
  });
  env.defBuiltinFunc('getOffset', function (selectorName, position) {
    switch (position) {
      case "top":
      case "left":
        style.setSelectorValue(selectorName, "offset", position, $(selectorName).offset()[position]);
        return style.getSelectorObject(selectorName).offset[position];
    }
  });
  env.defBuiltinFunc('getWidth', function (selectorName) {
    style.setSelectorValue(selectorName, "size", "width", $(selectorName).width());
    return style.getSelectorObject(selectorName).width;
  });
  env.defBuiltinFunc('getHeight', function (selectorName) {
    style.setSelectorValue(selectorName, "size", "height", $(selectorName).height());
    return style.getSelectorObject(selectorName).height;
  });
  // 縦横中央に固定
  env.defBuiltinFunc('fixToCenter', function (selectorName) {
    var $s = $(selectorName);
    var $w = $(window);

    var t = ($w.height() / 2) - ($s.height() / 2);
    var l = ($w.width() / 2) - ($s.width() / 2);

    style.setSelectorValue(selectorName, "property", "position", "fixed");
    style.setSelectorValue(selectorName, "property", "top", t + "px");
    style.setSelectorValue(selectorName, "property", "left", l + "px");
    style.setSelectorValue(selectorName, "property", "margin", "0");
    $tag.html(style.write());
  });
  // 一番上に固定
  env.defBuiltinFunc('fixToTop', function (selectorName) {
    var $s = $(selectorName);
    var $w = $(window);
    var l = ($w.width() / 2) - ($s.width() / 2);
    style.setSelectorValue(selectorName, "property", "position", "fixed");
    style.setSelectorValue(selectorName, "property", "top", 0 + "px");
    style.setSelectorValue(selectorName, "property", "left", l + "px");
    style.setSelectorValue(selectorName, "property", "margin", "0");
    $tag.html(style.write());
  });
  // 一番下に固定
  env.defBuiltinFunc('fixToBottom', function (selectorName) {
    var $s = $(selectorName);
    var $w = $(window);
    var t = ($w.height() / 2) - ($s.height() / 2);
    var l = ($w.width() / 2) - ($s.width() / 2);
    style.setSelectorValue(selectorName, "property", "position", "fixed");
    style.setSelectorValue(selectorName, "property", "top", t * 2 + "px");
    style.setSelectorValue(selectorName, "property", "left", l + "px");
    style.setSelectorValue(selectorName, "property", "margin", "0");
    $tag.html(style.write());
  });
  // 横幅をいっぱい広げる
  env.defBuiltinFunc('expandWidth', function (selectorName) {
    var $s = $(selectorName);
    var $w = $(window);
    style.setSelectorValue(selectorName, "property", "width", $(window).width() + "px");
    $tag.html(style.write());
  });
  // 縦幅をいっぱい広げる
  env.defBuiltinFunc('expandHeight', function (selectorName) {
    var $s = $(selectorName);
    var $w = $(window);
    style.setSelectorValue(selectorName, "property", "height", $(window).height() + "px");
    $tag.html(style.write());
  });
  // box-shadowを指定
  env.defBuiltinFunc('boxShadow', function (f) {
    return "-webkit-box-shadow:" + f +
      ";-moz-box-shadow:" + f +
      ";box-shadow:" + f;
  });
  // box-shadowを指定
  env.defBuiltinFunc('boxSizing', function (f) {
    return "-webkit-box-sizing:" + f +
      ";-moz-box-sizing:" + f +
      ";box-sizing:" + f;
  });
  // border-radiusを指定
  env.defBuiltinFunc('borderRadius', function (f) {
    return "-webkit-border-radius:" + f +
      ";-moz-border-radius:" + f +
      ";-ms-border-radius:" + f +
      ";-o-border-radius:" + f +
      ";border-radius:" + f;
  });
  // 縁取り文字を作る
  env.defBuiltinFunc('textStroke', function (weight, color) {
    var w = (weight.split("px"))[0], str;
    if (w > 1) {
      str = (function () {
        var values = [], tx, ty;
        for (var i = 0; i < 360; i += 5) {
          console.log(Math.floor(w * Math.sin(i * Math.PI / 100)));
          var x = Math.floor(w * Math.sin(i * Math.PI / 100)),
              y = Math.floor(w * Math.cos(i * Math.PI / 100));
          if (!(tx == x && ty == y)) {
            values.push(x + "px " + y + "px " + "1px " + color);
          }
          tx = x; ty = y;
        }
        return values.join(", ");
      })();
    } else {
      str = (function () {
        return [
          "1px 1px 0 " + color,
          "1px -1px 0 " + color,
          "-1px 1px 0 " + color,
          "-1px -1px 0 " + color
        ].join(", ");
      })();
    }
    return "text-shadow:" + str;
  });
  env.defBuiltinFunc('backgroundColor', function (f) {
    var cc = "";
    if ((f + "").length < 3) {
      for (var i = 0; i < 3; i++) {
        cc += f + "";
      }
    } else {

    }
    return "background-color:#" + cc;
  });
  env.defBuiltinFunc('float', function (f) {
    if (f == "left") {
      return "float: left";
    } else if (f == "right") {
      return "float: right";
    }
  });
  env.defBuiltinFunc('textAlign', function (f) {
    if (f == "left") {
      return "text-align: left";
    } else if (f == "right") {
      return "text-align: right";
    } else if (f == "center") {
      return "text-align: center";
    }
  });

};
