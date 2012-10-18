var IfStmnt = function (list) {
	this.children = list;
};
IfStmnt.prototype = new ASTList();

IfStmnt.prototype.condition = function () {
	return this.child(0);
};

IfStmnt.prototype.thenBlock = function() {
	return this.child(1);
};

IfStmnt.prototype.elseBlock = function() {
        return this.numChildren() > 2 ? this.child(2) : null;
}
IfStmnt.prototype.toString = function() {
        return '(if ' + this.condition() + ' ' + this.thenBlock()
		+ ' else ' + this.elseBlock() + ')';
}


// package stone.ast;
// import java.util.List;

// public class IfStmnt extends ASTList {
//     public IfStmnt(List<ASTree> c) { super(c); }
//     public ASTree condition() { return child(0); }
//     public ASTree thenBlock() { return child(1); }
//     public ASTree elseBlock() {
//         return numChildren() > 2 ? child(2) : null;
//     }
//     public String toString() {
//         return "(if " + condition() + " " + thenBlock()
//                  + " else " + elseBlock() + ")";
//     }
// }
