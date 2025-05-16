import "./style.css";

export default function Admin(){

    const labs = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const data = [10, 13, 4, 5, 2, 18, 2, 10, 13, 4, 5, 10];
    const intr = (Math.max.apply(null, data)/5);
    

    return (
      <div className="admin">
        <div className="topbar">
          <p className="title">VERTX ADMIN</p>
        </div>
        <div className="section">
          <div className="graph">
            <p className="title">
              User Trends <span>(50 users)</span>
            </p>
            <div className="gcont">
              <div className="labs">
                <div className="ls">
                  {Array(5)
                    .fill("0")
                    .map((v, i) => (
                      <p className="lab">{Math.round(intr * (i + 1))}</p>
                    ))}
                </div>
                <div className="empt"></div>
              </div>
              <div className="graph-cont">
                <div className="bars">
                  {data?.map((value) => (
                    <div className="bar">
                      <div
                        className="level"
                        style={{
                          height:
                            (value / Math.max.apply(null, data)) * 100 + "%",
                        }}
                      >
                        <p className="ct">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="labs-hor">
                  {labs?.map((lab) => (
                    <p className="lab">{lab}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}