var WhileStmnt = function (list) {
	this.children = list;
};
WhileStmnt.prototype = new ASTList();
WhileStmnt.prototype.condition = function () {
	return this.child(0);
};

WhileStmnt.prototype.body = function () {
	return this.child(1);
};

WhileStmnt.prototype.toString = function () {
	return '(while ' + this.condition() + ' ' + this.body() + ')';
};


// package stone.ast;
// import java.util.List;

// public class WhileStmnt extends ASTList {
//     public WhileStmnt(List<ASTree> c) { super(c); }
//     public ASTree condition() { return child(0); }
//     public ASTree body() { return child(1); }
//     public String toString() {
//         return "(while " + condition() + " " + body() + ")";
//     }
// }
