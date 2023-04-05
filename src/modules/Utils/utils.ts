export function getNetworkName(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      case 80001:
        return 'Polygon Mumbai Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 56:
        return 'Binance Smart Chain Mainnet';
      case 97:
        return 'Binance Smart Chain Testnet';
      case 100:
        return 'xDAI Chain';
      case 128:
        return 'Huobi ECO Chain Mainnet';
      case 256:
        return 'Huobi ECO Chain Testnet';
      case 43114:
        return 'Avalanche Mainnet C-Chain';
      case 43113:
        return 'Avalanche Fuji Testnet C-Chain';
      case 1666600000:
        return 'Harmony Mainnet Shard 0';
      case 1666700000:
        return 'Harmony Testnet Shard 0';
      default:
        return `Unknown Network (Chain ID: ${chainId})`;
    }
  }  