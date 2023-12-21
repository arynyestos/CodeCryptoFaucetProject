# Faucet project
This was the first web 2 project of the CodeCrypto course, considered as such, although it uses Ethereum, since there are no smart contracts.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Demo](#demo)

## Overview
This project consists on a simple faucet page where the user can connect their wallet and receive 10 ETH when clicking the button. It runs on a local Go Ethereum testnet deployed on a Docker Container.

![Faucet](https://github.com/arynyestos/CodeCryptoProjects/assets/33223441/75a3682d-f257-4636-a2c0-2aafdf9c61b5)

## Features
- **Local Ethereum Network:** In this project a local Ethereum network was created using Go Ethereum on Docker. It used Proof of Authority consensus algorithm, more precisely, Clique, which is the POA implementation if Ethereum geth.
- **Faucet Functionality:** Once the network was ready, both a backend consisting of an express server and a React front end were developed to complete a simple faucet, in which the wallet is automatically connected and 10 ETH are sent to it when the button is clicked.

## Technologies Used
As mentioned above, the technologies used in this project were:
- Docker
- Ethereum (Go Ethereum)
- Express.js
- React

## Installation
The steps to follow in order to try out the faucet locally are the following:

### Local blockchain creation 
This first step will consist on running some docker commands, therefore, it is presumed that Docker is installed and running.
- Open a terminal in a directory of you choice.
- Create a password.txt file in the same directory and write the password that will be used to create the keystore file.
- Run the following docker command to create a new Ethereum account:
```bash docker
docker run -it -v ${PWD}/password.txt:/password -v ${PWD}/data:/data --name eth-node-genesis ethereum/client-go:latest account new --datadir /data --password /password
```
- Create a genesis.json file. You can use the one featured in this repo just by modifying the addresses in the alloc field, as well as the one in the extradata field, which will be the authorized signer (take a look [here](https://victoryeo-62924.medium.com/clique-poa-in-ethereum-d8dad9d4fa3b) for further explanations!).
- Run the following docker command to initialize the blockchain database:
```bash docker
docker run -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data --name eth-node-initialization ethereum/client-go:latest init --datadir /data /genesis.json
```
- Run the following docker command to run the docker container with the Ethereum blockchain:
```bash docker
docker run -it -v ${PWD}/password.txt:/password -p 8545:8545 -v ${PWD}/data:/data --name eth-node-faucet-project ethereum/client-go:latest --datadir /data --allow-insecure-unlock --miner.etherbase 3fBF61B6B45Fb2a3D7F065D825f2D5AfE1616a81 --mine --unlock "3fBF61B6B45Fb2a3D7F065D825f2D5AfE1616a81" --password /password --http --http.addr "0.0.0.0" --http.port 8545 --http.corsdomain "*" --http.api "admin,eth,debug,miner,net,txpool,personal,web3"
```
Please note that in all these commands the -it flag was used to make the development more interactive and debug more easily any possible issues, feel free to use -d instead.

### Repo cloning
Once the network is up and running simply clone this repo in order to run the faucet:
```bash
git clone https://github.com/arynyestos/CodeCryptoFaucetProject.git
cd CodeCryptoFaucetProject
```

### Configuration
In order to use the faucet project you will need the private key of the address to which you allocated funds in the genesis.json. Place it in a .env file on a constant named PRIVATE_KEY, as well as its address assigning to a constant named ADDRESS. The .env shall look like this:
```.env
PRIVATE_KEY=c35ab18cba68cb1a35cb3a1cb8a..........
ADDRESS=0x9d8c21b98c472b9d4c298d27b............
```

## Usage
Once the Ethereum local network is running and the repo cloned:
1. Add the local network on Metamask with the proper RPC URL and chain ID. Use a name and token ticker of your choice:
![image](https://github.com/arynyestos/CodeCryptoFaucetProject/assets/33223441/f0c34a90-6100-468c-93e4-721fa2ec1425)

2. Start the server
```bash
cd Server
node index.js
```

3. Start the front end
```bash
cd '.\Front end\'
yarn
yarn dev
```

The wallet will be automatically connected to the faucet. Simply by clicking the button you will receive 10 ETH on the connected address.

## Future Improvements
A future improvement to this project, although by no means necessary for it to work, would be to add more nodes to the local network. Right now the project runs on a local blockchain with only one node creating blocks. It would be very interesting, for learning purposes, to run two or more nodes on separate containers and connect them all to the same local blockchain, so that actual consensus between all connected nodes has to be reached through the Clique algorithm.

## Demo
TODO
