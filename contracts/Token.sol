// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Importing solidity debugging tool that enables you to use console.log like javascript
import "../node_modules/hardhat/console.sol";

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 10000;

    address public owner;

    // Maps balances to a owner
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) external {    
        console.log("***Sender balance is %s", balances[msg.sender]);
        console.log("***Sender is sending %s tokens to %s address", amount, msg.sender);
        require(balances[msg.sender] >= amount, "Not Enough Money");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}