// ==== Types ====

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Required for determining priority
}

interface Props extends BoxProps { }

// ==== Priority Mapping ====

const priorityMap: Record<string, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
};

// Function to get blockchain priority
const getPriority = (blockchain: string): number =>
    priorityMap[blockchain] ?? -99;

// ==== Main Component ====

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
    const balances = useWalletBalances(); // Custom hook to fetch wallet balances
    const prices = usePrices(); // Custom hook to fetch token prices

    // Filter out zero/negative balances and sort by priority
    const sortedBalances = useMemo(() => {
        return balances
            .filter(balance => balance.amount > 0 && getPriority(balance.blockchain) > -99)
            .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
    }, [balances]);

    // Map sorted balances to display rows
    const rows = sortedBalances.map(balance => {
        const usdValue = (prices[balance.currency] || 0) * balance.amount;
        const formattedAmount = balance.amount.toFixed(2); // Format to 2 decimal places

        return (
            <WalletRow
                key={balance.currency} // Use a stable unique key, not index
                className={classes.row}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={formattedAmount}
            />
        );
    });

    // Render the wallet rows
    return (
        <div {...rest}>
            {rows}
        </div>
    );
};
