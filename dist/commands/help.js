"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require('whatsapp-web.js'),
  List = _require.List;
var Help = /*#__PURE__*/function () {
  function Help(client, msgData) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, Help);
    this.msgData = msgData;
    this.from = msgData.from;
    this.name = "menu", this.alias = ["help"], this.usage = "menu";
    this.client = client;
    this.args = args;
  }
  _createClass(Help, [{
    key: "defaultList",
    value: function defaultList() {
      var section = [{
        title: "Main Features",
        rows: [
        // {
        //     id: "1",
        //     title: "Generate Image",
        //     description: "Membuat gambar dari AI dengan menggunakan kata kunci yang diberikan (Bukan mencari gambar)",
        // },
        {
          id: "2",
          title: "Membuat Sticker",
          description: "Membuat sticker dari gambar yang diupload"
        }, {
          id: "3",
          title: "Sticker No Background",
          description: "Membuat sticker dari gambar yang diupload"
        }, {
          id: "4",
          title: "Remove Background",
          description: "Menghapus background dari gambar yang diupload"
        }]
      }, {
        title: "Information",
        rows: [{
          title: "Bot Info"
          // description: "Informasi mengenai bot",
        }, {
          title: "Author Info"
          // description: "Informasi mengenai pembuat bot",
        }]
      }];

      var list = new List('Klik menu untuk melihat keseluruhan', 'MENU', section, '', ''); // (Body, ButtonText, Sections, Title, FooterText)

      return this.client.sendMessage(this.from, list);
    }
  }, {
    key: "botInfo",
    value: function botInfo() {
      return this.client.sendMessage(this.from, "*Arisu Bot*\nVersion: 1.0.1\nLast Updadte: 21 January 2023\n\nChange log:\n- Update personality Arisu\n- Fix language Indonesia\n- Temporary saving history chat\n\n*knwow bug*:\n-Turu 😴😴😴\n");
    }
  }, {
    key: "botCreator",
    value: function botCreator() {
      return this.client.sendMessage(this.from, "*Author Information*\nName: Rama Aditya Saputra\nFacebook: https://www.facebook.com\nContact: 085856440266");
    }
  }]);
  return Help;
}();
module.exports = Help;