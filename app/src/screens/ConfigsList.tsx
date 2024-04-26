import React, {Context, useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import {IAxiosContext} from '../context/types';
import {AxiosContext} from '../context/AxiosContext';
import {IPaginationResponse, IVpnConfigInfo} from '../types';

const ConfigsList = (): React.JSX.Element => {
  const {authAxios} = useContext(AxiosContext as Context<IAxiosContext>);

  const [items, setItems] = React.useState<IVpnConfigInfo[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const from = page * pageSize;
  const to = Math.min((page + 1) * pageSize, totalItems);

  useEffect(() => {
    authAxios.get('/me/vpn').then(response => {
      const data = response.data as IPaginationResponse<IVpnConfigInfo>;
      setItems(data.data);
      setTotalPages(data.totalPages);
      setPageSize(data.pageSize);
      setTotalItems(data.totalCount);
    });
  }, [authAxios]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          My configs
        </Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
          </DataTable.Header>

          {items.map(item => (
            <DataTable.Row key={item.id} onPress={() => console.log(item.name)}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={setPage}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPage={pageSize}
            onItemsPerPageChange={setPageSize}
            showFastPaginationControls
          />
        </DataTable>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 50,
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 50,
  },
});

export default ConfigsList;
