import './dateBars.scss';

type DateBarsProps = {
    children: React.ReactNode;
}

export function DateBars({ children }: DateBarsProps) {
    return (
        <div className="date-bars">
            <div className="date-bars-bar">
                <div className="date-bars-bar-top">July 2026</div>
                <div className="date-bars-bar-mid date-bars-bar-mid-1">
                    <div className="date-bars-bar-mid-inner"></div>
                </div>
                <div className="date-bars-bar-bottom">250th</div>
            </div>
            <div className="date-bars-main">
                {children}
            </div>
            <div className="date-bars-bar date-bars-bar-2">
                <div className="date-bars-bar-top">1776</div>
                <div className="date-bars-bar-mid">
                    <div className="date-bars-bar-mid-inner"></div>
                </div>
                <div className="date-bars-bar-bottom">2026</div>
            </div>
        </div>
    );
}