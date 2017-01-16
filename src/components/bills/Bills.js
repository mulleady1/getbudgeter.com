import React from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import Timeframe from '../timeframe/Timeframe';
import BillList from './BillList';
import Graph from './Graph';
import {Loading} from '../shared';
import styles from './Bills.scss';

const Tab = {
  LIST: 1,
  GRAPH: 2
};

class Bills extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: Tab.LIST
    };
  }

  render() {
    const { 
      date,
      interval,
      isLoading
    } = this.props;

    const { tab } = this.state;

    const children = tab === Tab.LIST ?
      <BillList {...this.props} /> :
      <Graph {...this.props} />;

    return (
      <div>
        <div className={styles.header}>
          <Timeframe date={date} interval={interval} />
          <ButtonGroup>
            <Button
              active={tab === Tab.LIST}
              onClick={() => this.setState({ tab: Tab.LIST })}>
                List
            </Button>
            <Button
              active={tab === Tab.GRAPH}
              onClick={() => this.setState({ tab: Tab.GRAPH })}>
                Graph
            </Button>
          </ButtonGroup>
        </div>
        <div className={styles.content}>
          { isLoading ? <Loading /> : children }
        </div>
      </div>
    );
  }

}

export default Bills;
