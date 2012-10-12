var BinaryExpr = function (list) {
	this.children = list;
};
BinaryExpr.prototype = new ASTList();
BinaryExpr.prototype.left = function () {
	return this.child(0);
};
BinaryExpr.prototype.operator = function () {
	return this.child(1).token().getText();
};
BinaryExpr.prototype.right = function () {
	return this.child(2);
};


// package stone.ast;
// import java.util.List;

// public class BinaryExpr extends ASTList {
//     public BinaryExpr(List<ASTree> c) { super(c); }
//     public ASTree left() { return child(0); }
//     public String operator() {
//         return ((ASTLeaf)child(1)).token().getText();
//     }
//     public ASTree right() { return child(2); }
// }
