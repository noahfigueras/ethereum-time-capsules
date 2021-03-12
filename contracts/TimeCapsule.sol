// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract TimeCapsule {
    
    using SafeMath for uint256;

    address owner;
    bool isOperational;

    struct Capsule {
        string message;
        uint256 timestamp;
        address creatorAddress;
    }

    uint256 ID;
    mapping(uint256 => Capsule) private capsules;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    modifier requireOperational{
        require(isOperational, "Contract is not Operational!");
        _;
    }

    event TimeCapsuleSubmited(uint256 id);

    constructor() {
        owner = msg.sender;
        ID = 0;
        isOperational = true;
    }

    function submitTimeCapsule(string memory data, uint256 time) requireOperational external {
        require(msg.sender != address(0), "This is a 0x0 address!");
        capsules[ID] = Capsule({
            message: data,
            timestamp: time,
            creatorAddress: msg.sender
        });

        emit TimeCapsuleSubmited(ID);
        ID = ID.add(1);
    }

    function getTimeCapsule(uint256 id) requireOperational external view returns(string memory) {
        require(capsules[id].creatorAddress != address(0), "Message ID doesn't exist.");
        require(block.timestamp >= capsules[id].timestamp, "Message can't be revealed yet, it is inmortalized!");
        return capsules[id].message;
    }

    //Change contract state Operational/Non-Operational
    function operationalSwitch(bool _switch) onlyOwner external {
            isOperational = _switch;
    }
}
