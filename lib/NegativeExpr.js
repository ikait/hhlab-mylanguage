var NegativeExpr = function (list) {
	this.children = list;
};
NegativeExpr.prototype = new ASTList();


NegativeExpr.prototype.operand = function() {
	return this.child(0);
};
NegativeExpr.prototype.toString = function() {
        return "-" + this.operand();
};


// package stone.ast;
// import java.util.List;

// public class NegativeExpr extends ASTList {
//     public NegativeExpr(List<ASTree> c) { super(c); }
//     public ASTree operand() { return child(0); }
//     public String toString() {
//         return "-" + operand();
//     }
// }
