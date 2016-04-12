var BST = function (value, parent, left, right) {
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
};

BST.prototype.search = function (target) {
    var _search = function (node) {
        if (! node) return false;
        if (node.value === target) return node;
        if (target > node.value) return _search(node.right);
        else return _search(node.left);
    };
    return _search(this);
};

BST.prototype.min = function () {
    if (this.left) return this.left.min();
    return this;
};

BST.prototype.max = function () {
    if (this.right) return this.right.min();
    return this;
};

BST.prototype.insert = function (value) {
    var tree = this;
    var _insert = function (tree, value) {
        if (value > tree.value) {
            if (tree.right) return _insert(tree.right, value);
            else return tree.right = new BST(value, tree);
        }
        else if (value <= tree.value) {
            if (tree.left) return _insert(tree.left, value);
            else return tree.left = new BST(value, tree);
        }
        return console.log("error in insert");
    };
    _insert(tree, value);
    return tree;
};

BST.prototype.delete = function (value) {
    // helpers
    var _noChildDelete = function (tree) {
        var parent = tree.parent;
        if (parent.left === tree) return parent.left = null;
        if (parent.right === tree) return parent.right = null;
        else return console.log("error in no child delete");
    };
    var _oneChildDelete = function (tree) {
        var parent = tree.parent;
        var child = tree.right || tree.left;
        if (parent.left === tree) return parent.left = child;
        if (parent.right === tree) return parent.right = child;
        else return console.log("error in one child delete");
    };
    var _twoChildDelete = function (tree) {
        var replacement = tree.right.min();
        tree.value = replacement.value;
        return replacement.delete(replacement.value);
    };

    // end helpers
    var target = this.search(value);
    if (! target) {
        console.log(value + " was not found");
        return this;
    }
    if (target.right && target.left) {
        _twoChildDelete(target);
        return this;
    }
    if (target.right || target.left) {
        _oneChildDelete(target);
        return this;
    }
    else {
        _noChildDelete(target);
        return this;
    }
};


// functional attempt

var BSTF = function (value, parent, left, right) {
    return [value, parent, left, right];
};

var getValue = function (tree) { return tree [0]; };
var getParent = function (tree) { return tree [1]; };
var leftBranch = function (tree) { return tree [2]; };
var rightBranch = function (tree) { return tree [3]; };
var search = function (tree, target) {
    if (! tree) return null;
    if (getValue(tree) === target) return tree;
    if (target > getValue(tree)) return search(rightBranch(tree));
    if (target <= getValue(tree)) return search(leftBranch(tree));
    else return console.log("error in search");
};
var insert = function (tree, parent, value) {
    if (! tree) return BST(value, parent);
    return value > getValue(tree) ?
        BST (getValue(tree),
             getParent(tree),
             leftBranch(tree),
             insert(rightBranch(tree), tree, value)) :
        BST (getValue(tree),
             getParent(tree),
             insert(leftBranch(tree), tree, value),
             rightBranch(tree));
};
var max = function (tree) {
    return rightBranch(tree) ? max (rightBranch(tree)) :
        tree;
};
var min = function (tree) {
    return leftBranch(tree) ? min (leftBranch(tree)) :
        tree;
};

var replace = function (tree, target, replacement) {
    if (! tree) return null;
    if (getValue(tree) === target) return replacement;
    return target > getValue(tree) ?
        BST (getValue(tree),
             getParent(tree),
             leftBranch(tree),
             replace(rightBranch(tree), target, replacement)) :
        BST (getValue (tree),
             getParent(tree),
             replace(leftBranch(tree), target, replacement),
             rightBranch(tree));
};
