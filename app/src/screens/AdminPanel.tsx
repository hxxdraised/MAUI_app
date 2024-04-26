import React, {Context, useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DataTable, FAB, Text} from 'react-native-paper';
import {IPaginationResponse, IVpnConfig} from '../types';
import {AxiosContext} from '../context/AxiosContext';
import {IAxiosContext} from '../context/types';
import VpnConfigDialog from '../components/VpnConfigDialog';

const AdminPanel = (): React.JSX.Element => {
  const {authAxios} = useContext(AxiosContext as Context<IAxiosContext>);

  const [selectedItem, setSelectedItem] = React.useState<IVpnConfig | null>(
    null,
  );
  const [items, setItems] = React.useState<IVpnConfig[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(11);

  const from = page * pageSize;
  const to = Math.min((page + 1) * pageSize, totalItems);

  const openDialog = (item: IVpnConfig) => {
    setSelectedItem(item);
  };
  const hideDialog = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    authAxios.get('/vpn', {params: {page, pageSize}}).then(response => {
      const data = response.data as IPaginationResponse<IVpnConfig>;
      setItems(data.data);
      setTotalPages(data.totalPages);
      setPageSize(data.pageSize);
      setTotalItems(data.totalCount);
    });
  }, [authAxios, page, pageSize]);
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Admin panel
        </Text>
        <DataTable>
          <DataTable.Title>All VPN Configs</DataTable.Title>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title style={styles.ownerId}>Owner id</DataTable.Title>
          </DataTable.Header>

          {items.map(item => (
            <DataTable.Row key={item.id} onPress={() => openDialog(item)}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell style={styles.ownerId}>
                {item.userId}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${totalItems}`}
          numberOfItemsPerPage={pageSize}
          onItemsPerPageChange={setPageSize}
          showFastPaginationControls
          style={styles.pagination}
        />
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Pressed')}
        />
        {selectedItem && (
          <VpnConfigDialog config={selectedItem} hideDialog={hideDialog} />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 50,
    height: '100%',
  },
  title: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  ownerId: {
    flex: 2,
  },
  pagination: {
    position: 'absolute',
    bottom: 15,
    right: 0,
  },
  fab: {
    position: 'absolute',
    margin: 10,
    left: 0,
    bottom: 0,
  },
});

export default AdminPanel;
