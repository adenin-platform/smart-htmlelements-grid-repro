import { Component, Prop, Host, h } from '@stencil/core';

import { Grid, GridColumn, GridBehavior } from 'smart-webcomponents/source/typescript/smart.elements';

import 'smart-webcomponents/source/components/smart.ui.grid.js';

const w = window as any;

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.css',
  shadow: true,
})
export class MyFirstComponent {
  @Prop() columns: GridColumn[];
  @Prop() behavior: GridBehavior;
  @Prop() dataSource;
  @Prop() appearance;
  @Prop() paging;
  @Prop() pager;
  @Prop() sorting;
  @Prop() editing;
  @Prop() selection;

  componentDidLoad() {
    this.appearance = {
      alternationCount: 2,
      showRowHeader: true,
      showRowHeaderSelectIcon: true,
      showRowHeaderFocusIcon: true,
    };
    this.paging = {
      enabled: true,
    };
    this.pager = {
      visible: true,
    };
    this.sorting = {
      enabled: true,
    };
    this.editing = {
      enabled: true,
    };
    this.selection = {
      enabled: true,
      allowCellSelection: true,
      allowRowHeaderSelection: true,
      allowColumnHeaderSelection: true,
      mode: 'extended',
    };
    this.columns = [
      { label: 'Id', dataField: 'CustomerID' },
      { label: 'Company Name', dataField: 'CompanyName' },
      { label: 'Contact Name', dataField: 'ContactName' },
      { label: 'Contact Title', dataField: 'ContactTitle' },
      { label: 'Address', dataField: 'Address' },
      { label: 'City', dataField: 'City' },
      { label: 'Country', dataField: 'Country' },
    ];
    this.behavior = { columnResizeMode: 'growAndShrink' };
    this.dataSource = new w.Smart.DataAdapter({
      virtualDataSource: function (resultCallbackFunction: any, _details: any) {
        fetch('https://raw.githubusercontent.com/HTMLElements/smart-webcomponents/master/sampledata/customers.json')
          .then(response => response.json())
          .then(data => {
            resultCallbackFunction({
              dataSource: data,
              virtualDataSourceLength: data.length,
            });
          });
      },
      id: 'CustomerID',
      dataFields: ['CustomerID: string', 'CompanyName: string', 'ContactName: string', 'ContactTitle: string', 'Address: string', 'City: string', 'Country: string'],
    });
  }

  render() {
    return (
      <Host>
        <smart-ui-grid
          appearance={this.appearance}
          sorting={this.sorting}
          selection={this.selection}
          editing={this.editing}
          pager={this.pager}
          paging={this.paging}
          behavior={this.behavior}
          dataSource={this.dataSource}
          columns={this.columns}
          id="grid"
        ></smart-ui-grid>
      </Host>
    );
  }
}
