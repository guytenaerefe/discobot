var listReplace = function (input, mappings) {
    var replaceList = new RegExp(Object.keys(mappings).join("|"), "gi");
    return input.replace(replaceList, function(match) {
        return mappings[match];
    });
};

exports.listReplace = listReplace;