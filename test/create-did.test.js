import { Sdk } from '@peaq-network/sdk'

import { expect } from 'chai'
import sinon from 'sinon'
import { createPeaqDID } from '../src/create-did.js'

describe('createPeaqDID', function () {
  let sdkStub
  let didCreateStub

  beforeEach(() => {
    // Stub Sdk.createInstance to return a fake instance with a stubbed did.create method
    didCreateStub = sinon.stub().resolves({ hash: 'fakeHash' })
    sdkStub = sinon
      .stub(Sdk, 'createInstance')
      .resolves({ did: { create: didCreateStub }, disconnect: () => {} })
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should create a DID and return its hash', async function () {
    const hash = await createPeaqDID('TestDID', 'testSeed')
    expect(hash).to.equal('fakeHash')
    expect(sdkStub.calledOnce).to.be.true
    expect(didCreateStub.calledOnceWith({ name: 'TestDID' })).to.be.true
  })
})
