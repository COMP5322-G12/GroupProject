import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

class CustomTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };
  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {
      order, orderBy, headers,
    } = this.props;
    return (
      <TableHead>
        <TableRow>
          {
            headers.map(column => (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ), this)
          }
          <TableCell />
        </TableRow>
      </TableHead>
    );
  }
}

export default CustomTableHead;
