import fs from "fs"
import { Wallet,utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const PRI_KEY = fs.readFileSync(".secret").toString()
// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the TetherToken contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRI_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("TetherToken");

  // Estimate contract deployment fee
  // const greeting = "Hi there!";
  // const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);
  const deploymentFee = await deployer.estimateDeployFee(artifact, ["1000000","AiyueUsdt","aiusdt","6"]);

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const greeterContract = await deployer.deploy(artifact, ["1000000","AiyueUsdt","aiusdt","6"]);

  //obtain the Constructor Arguments
  //console.log("constructor args:" + greeterContract.interface.encodeDeploy([]));

  // Show the contract info.
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
