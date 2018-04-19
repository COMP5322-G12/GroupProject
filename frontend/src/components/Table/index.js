import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-i18nify';

import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';

import TableHead from './CustomTableHead';

const styles = () => ({
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomTable extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    headers: PropTypes.arrayOf(PropTypes.shape({})),
    order: PropTypes.string,
    orderBy: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    renderActionRow: PropTypes.func.isRequired,
  };
  static defaultProps = {
    order: 'asc',
    headers: [
      // { id: , numeric: , disablePadding: , label:  },
    ],
  }
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      orderBy: props.orderBy,
      data: props.data,
      page: 0,
      rowsPerPage: 10,
      headers: props.headers,
      primaryKey: props.primaryKey,
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      order: newProps.order,
      orderBy: newProps.orderBy,
      data: newProps.data,
      headers: newProps.headers,
      primaryKey: newProps.primaryKey,
    });
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  render() {
    const { classes } = this.props;
    const {
      data, order, orderBy, rowsPerPage, page, primaryKey, headers,
    } = this.state;
    const currentStart = page * rowsPerPage;
    const currentEnd = currentStart + rowsPerPage;
    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
            headers={this.state.headers}
          />
          <TableBody>
            {
              data.slice(currentStart, currentEnd).map((n, i) => (
                <TableRow key={n[primaryKey]} tabIndex={-1}>
                  {
                    headers.map(header => (
                      <TableCell
                        key={header.id}
                        numeric={header.numeric}
                        padding={header.disablePadding ? 'none' : 'default'}
                      >
                        {n[header.id]}
                      </TableCell>
                    ))
                  }
                  {this.props.renderActionRow(n, i)}
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                labelRowsPerPage={<Translate value="Application.rowsPerPage" />}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(CustomTable);
