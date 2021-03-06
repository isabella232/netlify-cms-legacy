import MarkdownFormatter from "./markdown";
import YAML from "./yaml";

export default MarkdownFormatter.extend({
  extension: "md",
  fromFile: function(content) {
    var regexp = /^---\n([^]*?)\n---\n([^]*)$/;
    var match = content.match(regexp);
    var obj = match ? YAML.create({}).fromFile(match[1]) : {};
    obj.body = match ? (match[2] || "").replace(/^\n+/, '') : content;
    return obj;
  },
  toFile: function(data) {
    var meta = {};
    var body = "" ;
    var content = "";
    for (var key in data) {
      if (key === "body") {
        body = data[key];
      } else {
        meta[key] = data[key];
      }
    }

    content += "---\n";
    content += YAML.create({}).toFile(meta);
    content += "---\n\n";
    content += body;
    return content;
  }
});
