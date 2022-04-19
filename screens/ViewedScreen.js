import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Dimensions,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { COLORS, MARGIN, PADDING, SIZES, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MoviesContext } from "../src/context";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { formatDate } from "../src/utils/formatDate";

const ViewedScreen = () => {
  const appContext = useContext(MoviesContext);
  const {
    watchedMovies,
    sortWatchedMovies,
    sortNameMovies,
    sortDurationMovies,
  } = appContext;
  const [sort, setSort] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);

  const orderWatchedMovies = () => {
    setSort(!sort);
    sortWatchedMovies(sort);
  };
  const orderNameMovies = () => {
    setSort(!sort);
    sortNameMovies(sort);
  };
  const orderDurationMovies = () => {
    setSort(!sort);
    sortDurationMovies(sort);
  };
  const showDates = (movieId) => {
    console.log(movieId);
    let modalData = watchedMovies.find((movie) => movie.movieId === movieId)
    modalData.date.reverse()
    setModalInfo(modalData);

    setModalVisible(!modalVisible);
  };

  const Item = ({ item }) => {
    return (
      <View
        style={
          item.justAdded
            ? [styles.listContainer, styles.justAddedStyle]
            : [styles.listContainer]
        }
      >
        <Text
          onPress={() => alert(JSON.stringify(item))}
          style={{
            color: COLORS.lightGray,
            flex: 2.5,
            fontWeight: "bold",
            marginLeft: MARGIN.m1,
            flexWrap: "wrap",
            marginRight: MARGIN.m4,
            // flexShrink: -10,
          }}
        >
          {item.title}
        </Text>

        <Text style={{ color: COLORS.lightGray, flex: 1 }}>
          <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>
            {item.runing_time}
          </Text>
        </Text>

        <View style={{ width: "25%", flex: 1 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => showDates(item.movieId)}
          >
            <Text
              style={{
                color: COLORS.lightGray,
                fontSize: SIZES.h4,
                fontWeight: "bold",
              }}
            >
              {" "}
              {item.date.length}
              {/* <Text style={{ color: COLORS.lightGray, fontWeight: 'bold' }}></Text> */}
            </Text>
            <MaterialCommunityIcons
              name="calendar-range"
              color={COLORS.lightGray}
              size={SIZES.h3}
              style={{ marginHorizontal: MARGIN.m1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.dateContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: MARGIN.m1,
          }}
        >
          <MaterialCommunityIcons
            name="calendar"
            color={COLORS.lightGray}
            size={SIZES.h4}
          />
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h3,
            textAlign: "center",
          }}
        >
          {formatDate(item)}
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: MARGIN.m1,
          }}
        >
          <MaterialCommunityIcons
            name="clock"
            color={COLORS.lightGray}
            size={SIZES.h4}
          />
        </View>
      </View>
    );
  };

  useEffect(() => {
    console.log('watched movies cambio')
  }, [watchedMovies])
  

  // const memoizedValueModal = useMemo(() => renderItem, [modalInfo]);
  const memoizedValueItem = useCallback(({ item }) => Item({item}), [watchedMovies]);


  return (
    <View style={styles.container}>
      {/* <Button title="show" onPress={() => alert(JSON.stringify(watchedMovies))} /> */}
      {
        //? MODAL
      }
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCenterView}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.h2,
                textAlign: "center",
                marginBottom: MARGIN.m3,
              }}
            >
              {modalInfo.title}
            </Text>
            <FlatList
              data={modalInfo?.date}
              renderItem={({ item }) => {
                return (
                  <View style={styles.dateContainer}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: MARGIN.m1,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="calendar"
                        color={COLORS.lightGray}
                        size={SIZES.h4}
                      />
                    </View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: SIZES.h3,
                        textAlign: "center",
                      }}
                    >
                      {formatDate(item)}
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: MARGIN.m1,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="clock"
                        color={COLORS.lightGray}
                        size={SIZES.h4}
                      />
                    </View>
                  </View>
                );
              }}
              keyExtractor={(date, i) => date + i}
            />
            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: COLORS.lightGray, fontSize: SIZES.h4 }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {
        //? HEADER LIST
      }

      <View style={styles.headerList}>
        <Text></Text>

        <Pressable onPress={() => orderNameMovies()} style={{ flex: 2.5 }}>
          {({ pressed }) => (
            <Text
              style={{
                color: pressed ? COLORS.pink : COLORS.lightGray,
                fontWeight: "bold",
                flex: 2,
                width: "100%",
                fontSize: SIZES.h3,
                marginLeft: MARGIN.m1,
              }}
            >
              Película
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => orderDurationMovies()} style={{ flex: 1 }}>
          {({ pressed }) => (
            <Text
              style={{
                color: pressed ? COLORS.pink : COLORS.lightGray,
                fontWeight: "bold",
                flex: 1,
                width: "100%",
                fontSize: SIZES.h3,
              }}
            >
              Duración
            </Text>
          )}
        </Pressable>

        <Pressable onPress={() => orderWatchedMovies()} style={{ flex: 1 }}>
          {({ pressed }) => (
            <Text
              style={{
                color: pressed ? COLORS.pink : COLORS.lightGray,
                fontWeight: "bold",
                flex: 1,
                width: "100%",
                fontSize: SIZES.h3,
              }}
            >
              Vistas
            </Text>
          )}
        </Pressable>
      </View>
      <FlatList
        data={watchedMovies}
        renderItem={Item}
        keyExtractor={(movie) => movie.movieId}
        ItemSeparatorComponent={(props) => (
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.darkGray,
              marginVertical: MARGIN.m1,
            }}
          />
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.darkGray,
              marginVertical: MARGIN.m1,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: COLORS.black,
    marginHorizontal: MARGIN.m1,
    marginTop: MARGIN.m6,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    // padding: MARGIN.m6,
  },
  headerList: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    marginBottom: MARGIN.m1,
    // borderColor: 'white',
    // borderWidth: 3
    // justifyContent: "space-between",
    // padding: MARGIN.m6,
  },
  wrapperCustom: {
    // flex: 1,
    // borderRadius: 8,
  },
  justAddedStyle: {
    backgroundColor: COLORS.pink,
    paddingVertical: MARGIN.m7,
  },
  modalCenterView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: TOTAL_HEIGHT * 0.4,
    width: TOTAL_WIDTH * 0.75,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: COLORS.notSoGray,
    paddingHorizontal: PADDING.pd1,
    paddingVertical: PADDING.pd5,
    // alignItems: "center",
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeModalBtn: {
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
    marginVertical: MARGIN.m4,
    padding: 10,
  },
});

export default ViewedScreen;
