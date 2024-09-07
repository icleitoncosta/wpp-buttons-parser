"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptAndParserMsgButtons = encryptAndParserMsgButtons;
function parserButtons(proto, devices) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const mobileDevices = devices.filter((p) => !p.device);
    const webDevices = devices.filter((p) => p.device);
    const interactiveMessage = (_b = (_a = proto.viewOnceMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.interactiveMessage;
    let useTemplateMessage = false;
    const protoForWeb = JSON.parse(JSON.stringify(proto));
    if (interactiveMessage) {
        const mediaPart = [
            'documentMessage',
            'documentWithCaptionMessage',
            'imageMessage',
            'videoMessage',
        ];
        let header = undefined;
        let headerType = 1;
        for (let part of mediaPart) {
            if (part in interactiveMessage.header) {
                const partName = part;
                if (part === 'documentWithCaptionMessage')
                    part = 'documentMessage';
                header = { [partName]: interactiveMessage.header[partName] };
                headerType =
                    partName == 'imageMessage'
                        ? 4
                        : partName.includes('document')
                            ? 3
                            : partName == 'videoMessage'
                                ? 5
                                : 1;
                break;
            }
        }
        const buttonsMessage = {
            message: {
                buttonsMessage: Object.assign(Object.assign({ headerType, contentText: ((_c = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.body) === null || _c === void 0 ? void 0 : _c.text) || ' ', footerText: ((_d = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.footer) === null || _d === void 0 ? void 0 : _d.text) || ' ' }, header), { buttons: (_e = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.nativeFlowMessage) === null || _e === void 0 ? void 0 : _e.buttons.map((button, index) => {
                        var _a, _b;
                        if (button.name == 'quick_reply') {
                            return {
                                type: 1,
                                buttonId: ((_a = JSON.parse(button.buttonParamsJson)) === null || _a === void 0 ? void 0 : _a.id) || `${index}`,
                                buttonText: {
                                    displayText: ((_b = JSON.parse(button.buttonParamsJson)) === null || _b === void 0 ? void 0 : _b.display_text) || ' ',
                                },
                            };
                        }
                        else {
                            useTemplateMessage = true;
                            return null;
                        }
                    }).filter((i) => i != null) }),
            },
        };
        const templateMessage = {
            message: {
                templateMessage: {
                    hydratedTemplate: Object.assign(Object.assign(Object.assign({ hydratedButtons: (_f = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.nativeFlowMessage) === null || _f === void 0 ? void 0 : _f.buttons.map((button, index) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            if (button.name == 'quick_reply') {
                                return {
                                    index: index,
                                    quickReplyButton: {
                                        displayText: ((_a = JSON.parse(button.buttonParamsJson)) === null || _a === void 0 ? void 0 : _a.display_text) ||
                                            ' ',
                                        id: ((_b = JSON.parse(button.buttonParamsJson)) === null || _b === void 0 ? void 0 : _b.id) || `${index}`,
                                    },
                                };
                            }
                            else if (button.name == 'cta_url') {
                                return {
                                    index: index,
                                    urlButton: {
                                        displayText: ((_c = JSON.parse(button.buttonParamsJson)) === null || _c === void 0 ? void 0 : _c.display_text) ||
                                            ' ',
                                        url: (_d = JSON.parse(button.buttonParamsJson)) === null || _d === void 0 ? void 0 : _d.url,
                                    },
                                };
                            }
                            else if (button.name == 'cta_copy') {
                                return {
                                    index: index,
                                    urlButton: {
                                        displayText: ((_e = JSON.parse(button.buttonParamsJson)) === null || _e === void 0 ? void 0 : _e.display_text) ||
                                            ' ',
                                        url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${(_f = JSON.parse(button.buttonParamsJson)) === null || _f === void 0 ? void 0 : _f.copy_code}`,
                                    },
                                };
                            }
                            else if (button.name == 'cta_call') {
                                return {
                                    index: index,
                                    callButton: {
                                        displayText: ((_g = JSON.parse(button.buttonParamsJson)) === null || _g === void 0 ? void 0 : _g.display_text) ||
                                            ' ',
                                        phoneNumber: (_h = JSON.parse(button.buttonParamsJson)) === null || _h === void 0 ? void 0 : _h.phone_number,
                                    },
                                };
                            }
                            else {
                                return null;
                            }
                        }).filter((i) => i != null) }, header), (headerType == 1
                        ? { hydratedTitleText: ((_g = interactiveMessage.header) === null || _g === void 0 ? void 0 : _g.title) || ' ' }
                        : undefined)), { hydratedContentText: ((_h = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.body) === null || _h === void 0 ? void 0 : _h.text) || ' ', hydratedFooterText: ((_j = interactiveMessage === null || interactiveMessage === void 0 ? void 0 : interactiveMessage.footer) === null || _j === void 0 ? void 0 : _j.text) || ' ' }),
                },
            },
        };
        delete protoForWeb.viewOnceMessage;
        protoForWeb.documentWithCaptionMessage = useTemplateMessage
            ? templateMessage
            : buttonsMessage;
        protoForWeb.messageContextInfo = proto.messageContextInfo;
    }
    return [
        { proto: proto, devices: mobileDevices },
        { proto: protoForWeb, devices: webDevices },
    ];
}
function encryptAndParserMsgButtons(message, proto, devices, options, reporter, groupData, func) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (typeof groupData === 'function') {
            func = groupData;
        }
        const parts = [];
        if ((_b = (_a = proto === null || proto === void 0 ? void 0 : proto.viewOnceMessage) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.interactiveMessage) {
            const buttons = parserButtons(proto, devices);
            buttons.map((btn) => __awaiter(this, void 0, void 0, function* () {
                const result = yield func(message, btn.proto, btn.devices, options, reporter, typeof groupData !== 'function' ? groupData : undefined);
                parts.push(...result.stanza.content[0].content);
            }));
        }
        const node = yield func(message, proto, devices, options, reporter, typeof groupData !== 'function' ? groupData : undefined);
        if (parts.length > 0)
            node.stanza.content[0].content = parts;
        return node;
    });
}
