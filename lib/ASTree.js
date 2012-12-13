var ASTree = function () {
	// かなり何もしてないくさいな…様子見。
};


// 標準出力にあたる関数を登録する
ASTree.prototype.onstdout = function (fn) {
        stdout = fn;
};

var stdout = function () {};


// package stone.ast;
// import java.util.Iterator;

// public abstract class ASTree implements Iterable<ASTree> {
//     public abstract ASTree child(int i);
//     public abstract int numChildren();
//     public abstract Iterator<ASTree> children();
//     public abstract String location();
//     public Iterator<ASTree> iterator() { return children(); }
// }
