import './DataItem.scss'

interface HistoryItem {
    date: string;
    status: string;
}

export const DataItem: React.FC<HistoryItem> = ( {date, status} ) => {

    return (
        <div className='data-item'>
            <span className='data-item__date'>{date}</span>
            <span className='data-item__state'>{status}</span>
        </div>
    )
}