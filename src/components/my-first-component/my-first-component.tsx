import { Component, Host, h } from '@stencil/core';

import { Grid } from 'smart-webcomponents/source/typescript/smart.elements';

import 'smart-webcomponents/source/components/smart.ui.grid.js';

const w = window as any;

@Component({
  tag: 'my-first-component',
  styleUrl: 'my-first-component.css',
  shadow: true,
})
export class MyFirstComponent {
  componentDidLoad() {
    w.Smart(
      '#grid',
      class {
        get properties() {
          return {
            behavior: { columnResizeMode: 'growAndShrink' },
            appearance: {
              alternationCount: 2,
              showRowHeader: true,
              showRowHeaderSelectIcon: true,
              showRowHeaderFocusIcon: true,
            },
            paging: {
              enabled: true,
            },
            pager: {
              visible: true,
            },
            sorting: {
              enabled: true,
            },
            editing: {
              enabled: true,
            },
            selection: {
              enabled: true,
              allowCellSelection: true,
              allowRowHeaderSelection: true,
              allowColumnHeaderSelection: true,
              mode: 'extended',
            },
            dataSource: new w.Smart.DataAdapter({
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
            }),
            columns: [
              { label: 'Id', dataField: 'CustomerID' },
              { label: 'Company Name', dataField: 'CompanyName' },
              { label: 'Contact Name', dataField: 'ContactName' },
              { label: 'Contact Title', dataField: 'ContactTitle' },
              { label: 'Address', dataField: 'Address' },
              { label: 'City', dataField: 'City' },
              { label: 'Country', dataField: 'Country' },
            ],
          } as Grid;
        }
      },
    );
  }

  render() {
    return (
      <Host>
        <smart-ui-grid id="grid"></smart-ui-grid>
      </Host>
    );
  }
}
