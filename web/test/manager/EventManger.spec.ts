import "jasmine";
import { eventBus } from "../../lib/EventBus";
import { EventManager } from "../../manager/EventManager";

describe("Event Manger Testing", () => {
    it("Add Event Listner Test", () => {
        spyOn(eventBus, 'addEventListener');
        var fn = function () {
            console.log("this is a callback function")
        };
        EventManager.addEventListener("Testing", fn, "");
        expect(eventBus.addEventListener).toHaveBeenCalled();
        expect(eventBus.addEventListener).toHaveBeenCalledWith("Testing", fn, "")
    });
    it("Dispatch Event Test", () => {
        spyOn(eventBus, "dispatch");
        EventManager.dispatchEvent("Testing", {}, "");
        expect(eventBus.dispatch).toHaveBeenCalled();
        expect(eventBus.dispatch).toHaveBeenCalledWith("Testing", "")
    });
    it("Event removal Test", () => {
        spyOn(eventBus, "removeEventListener");
        var fn = function () {
            console.log("this is a callback function")
        };
        EventManager.removeEventListener("Testing", fn, "");
        expect(eventBus.removeEventListener).toHaveBeenCalled();
        expect(eventBus.removeEventListener).toHaveBeenCalledWith("Testing", fn, "")
    });
});