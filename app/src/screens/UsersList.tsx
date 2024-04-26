import React, {Context, useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {DataTable, Text} from 'react-native-paper';
import {AxiosContext} from '../context/AxiosContext';
import {IAxiosContext} from '../context/types';
import {IPaginationResponse, IUser} from '../types';
import UserInfoDialog from '../components/UserInfoDialog';

const UsersList = (): React.JSX.Element => {
  const {authAxios} = useContext(AxiosContext as Context<IAxiosContext>);

  const [selectedItem, setSelectedItem] = React.useState<IUser | null>(null);
  const [items, setItems] = React.useState<IUser[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(11);

  const from = page * pageSize;
  const to = Math.min((page + 1) * pageSize, totalItems);

  const openDialog = (item: IUser) => {
    setSelectedItem(item);
  };
  const hideDialog = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    authAxios.get('/admin/users', {params: {page, pageSize}}).then(response => {
      const data = response.data as IPaginationResponse<IUser>;
      setItems(data.data);
      setTotalPages(data.totalPages);
      setPageSize(data.pageSize);
      setTotalItems(data.totalCount);
    });
  }, [authAxios, page, pageSize]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Users
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.emailColumn}>Email</DataTable.Title>
          <DataTable.Title style={styles.emailColumn}>Name</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
        </DataTable.Header>

        {items.map(item => (
          <DataTable.Row key={item.id} onPress={() => openDialog(item)}>
            <DataTable.Cell style={styles.emailColumn}>
              {item.email}
            </DataTable.Cell>
            <DataTable.Cell style={styles.emailColumn}>
              {item.name}
            </DataTable.Cell>
            <DataTable.Cell>{item.role}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${totalItems}`}
          numberOfItemsPerPage={pageSize}
          onItemsPerPageChange={setPageSize}
          showFastPaginationControls
        />
      </DataTable>
      {selectedItem && (
        <UserInfoDialog user={selectedItem} hideDialog={hideDialog} />
      )}
    </ScrollView>
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
  emailColumn: {
    flex: 3,
  },
  nameColumn: {
    flex: 2,
  },
});

export default UsersList;
