'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var commander = _interopDefault(require('commander'));
var Path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));

var name = "local-ssl-proxy";
var version = "1.3.0";

var exists = function exists(path) {
  fs.accessSync(absolutePath(path));
  return path;
};
var absolutePath = function absolutePath(path) {
  return Path.isAbsolute(path) ? path : Path.resolve(process.cwd(), path);
};
var parseInteger = function parseInteger(value) {
  return parseInt(value, 10);
};

var program = commander.command(name).version(version, "-v, --version", "show version number").option("-n, --hostname <hostname>", "hostname for the server", "localhost").option("-s, --source <source>", "source port for the server", parseInteger, 9001).option("-t, --target <target>", "target port for the server", parseInteger, 9000).option("-c, --cert <cert>", "path to SSL certificate", exists, Path.resolve(__dirname, "..", "resources", "localhost.cert")).option("-k, --key <key>", "path to SSL key", exists, Path.resolve(__dirname, "..", "resources", "localhost.key")).option("-o, --config <config>", "path to configuration file", function (path) {
  return require(absolutePath(path));
});

var commandline = {
  parse: function parse(args) {
    return args === undefined ? program.parse().opts() : program.parse(args, { from: "user" }).opts();
  }
};

module.exports = commandline;
