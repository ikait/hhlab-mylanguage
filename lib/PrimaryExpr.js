var PrimaryExpr = function (list) {
	this.children = list;
};
PrimaryExpr.prototype = new ASTList();
PrimaryExpr.prototype.create = function(c) {
	return c.size() == 1 ? c.get(0) : new PrimaryExpr(c);
};

// package stone.ast;
// import java.util.List;

// public class PrimaryExpr extends ASTList {
//     public PrimaryExpr(List<ASTree> c) { super(c); }
//     public static ASTree create(List<ASTree> c) {
//         return c.size() == 1 ? c.get(0) : new PrimaryExpr(c);
//     }
// }
