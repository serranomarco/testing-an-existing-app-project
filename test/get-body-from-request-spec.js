const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    // Arrange
    const bodyPromise = getBodyFromRequest(fakeReq);
    const expectedBody = '';
    //Act
    fakeReq.emit('end')
    //Assert
    bodyPromise
      .then(body => {
        if (body === expectedBody) {
          done();
        } else {
          done(`Failed. Got ${body}`);
        }
      })
  });

  it('returns the data read from the stream', done => {
    const bodyPromise = getBodyFromRequest(fakeReq);
    const data1 = 'Peanut Butter Jelly Time';
    const data2 = "date from browser";

    fakeReq.emit('data', data1);
    fakeReq.emit('data', data2);
    fakeReq.emit('end')

    bodyPromise
      .then(body => {
        if (body === data1 + data2) {
          done();
        } else {
          done(`Failed. Got ${body}`);
        }
      })
  });
});
