// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract TimeCapsule {
    
    using SafeMath for uint256;

    address owner;
    bool isOperational;

    struct Message {
        string content;
        uint256 timestamp;
        address creatorAddress;
    }

    uint256 ID;
    mapping(uint256 => Message) private  messages;

    modifier onlyOwner{
        require(msg.sender == owner);
        _;
    }

    modifier requireOperational{
        require(isOperational, "Contract is not Operational!");
        _;
    }

    event MessageSubmited();

    constructor() {
        owner = msg.sender;
        ID = 0;
        isOperational = true;
    }

    function submitMessage(string memory data, uint256 time) requireOperational external {
        require(msg.sender != address(0), "This is a 0x0 address!");
        messages[ID] = Message({
            content: data,
            timestamp: time,
            creatorAddress: msg.sender
        });

        ID = ID.add(1);
        emit MessageSubmited();
    }

    function getMessageById(uint256 id) requireOperational external view returns(string memory) {
        require(messages[id].creatorAddress != address(0), "Message ID doesn't exist.");
        require(block.timestamp <= messages[id].timestamp, "Message can't be revealed yet, it is inmortalized!");
        return messages[id].content;
    }

    //Change contract state Operational/Non-Operational
    function operationalSwitch(bool _switch) onlyOwner external {
            isOperational = _switch;
    }
}
