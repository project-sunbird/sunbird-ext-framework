import 'mocha'
import { EventManager } from './../../src/managers/EventManager';
import { expect } from 'chai';
import * as Sinon from 'sinon';


describe('EventManager', () => {

  it('should listen to events on subscription ', () => {
    let emittedData = "event emiited"
    let method = (data, e) => {
      expect(data).to.be.equal(emittedData)
    }
    EventManager.subscribe('test', method)
    EventManager.emit('test', emittedData)
  })

  it('should not listen to events on unsubscribe ', () => {
    let emittedData = "event emiited"
    let callCount = 0;
    let method = (data, e) => {
      expect(data).to.be.equal(emittedData)
      callCount++;
    }
    EventManager.subscribe('test', method)
    EventManager.emit('test', emittedData)
    EventManager.unsubscribe('test', method)
    EventManager.emit('test', emittedData)
    expect(callCount).to.be.equals(1)
  })


})