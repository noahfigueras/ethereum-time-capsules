var TimeCapsule = artifacts.require("TimeCapsule");

contract("Time Capsule Tests", async function(accounts){
    
    const owner = accounts[0];
    const user1 = accounts[1];

    let params = {
        message: 'Hello World from the Past',
        timestamp: Math.round((new Date()).getTime() / 1000) + 30
    }

    console.log("Init timestamp: ",Math.round((new Date()).getTime() / 1000))
    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("First User: accounts[1] ", accounts[1]);

    /****************************************************************************************/
    /* Operations and Settings                                                              */
    /****************************************************************************************/

    it('Submits submitTimeCapsule() correctly', async function (){
        const timeCapsule = await TimeCapsule.deployed();
        //Submit Time capsule
        let capsule = await timeCapsule.submitTimeCapsule(params.message, params.timestamp);
    })

    it('Getter function does not work if current time < capsule timestamp', async function(){
        const timeCapsule = await TimeCapsule.deployed();
        let status = true;
        //Try to get message
        try {
            await timeCapsule.getTimeCapsule(0)
        } catch(e) {
            status = false
        }
        assert.equal(status,false, "Getter function require timestamp expired not working!");
    })
    
    it('Getter function should work when timestamp is expired (currentTime > capsulte timestamp)', async function(){
        async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
        }

        await timeout(31000);
        let timeCapsule = await TimeCapsule.deployed();
        //In order to read the message we need to update the last block timestamp with a new block.
        //getTimeCapsule() is only a read function and it's not going to update block.timestamp
        //Therefore user will need to pay using a store function or wait until someone creates a new capsule
        let submitCapsule = await timeCapsule.submitTimeCapsule('Second message', params.timestamp);
        let capsule = await timeCapsule.getTimeCapsule(0)
        assert.equal(capsule,params.message, "Timestamp getter function not working properly");
    })
})

