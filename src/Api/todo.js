import { catchError, getToken } from "../Utility/helper";
import client from "./client";
export const createTodo = async (todoInfo) => {

  const token = getToken();
  try {
    const { data } = await client.post("/todo/create",todoInfo, {
      headers: {

        authorization: "Bearer " + token,
      },

    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};


// export const searchActor = async (query) => {
//   const token = getToken();
//   try {
//     const { data } = await client(`/actor/search?name=${query}`, {
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     });
//     return data;
//   } catch (error) {
//     return catchError(error);
//   }
// };

export const updateTodo = async (id,todoInfo) => {
  const token = getToken();
  try {
    const { data } = await client.post("/todo/update/" + id,todoInfo, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteTodo = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/todo/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTodo = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/todo/getTodo?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};


export const CompleatedTask = async (id,TodoInformation) => {
  console.log(TodoInformation)
  const token = getToken();
  try {
    const { data } = await client.post("/todo/TaskDone/" + id,TodoInformation, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};


// export const getActorProfile = async (id) => {
//   try {
//     const { data } = await client(`/actor/single/${id}`);
//     return data;
//   } catch (error) {
//     return catchError(error);
//   }
// };
