var BlockStmnt = function (list) {
	this.children = list;
};
BlockStmnt.prototype = new ASTList();


// package stone.ast;
// import java.util.List;

// public class BlockStmnt extends ASTList {
//     public BlockStmnt(List<ASTree> c) { super(c); }
// }
