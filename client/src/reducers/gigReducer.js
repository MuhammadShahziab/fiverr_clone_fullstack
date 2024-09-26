export const initialState = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  desc: "",
  cat: "",
  price: "",
  images: [],
  shortDesc: "",
  shortTitle: "",
  deliveryTime: "",
  revisionNumber: "",
  features: [""],
  tags: [],
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        images: action.payload.images,
      };
    case "ADD_TAGS":
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };

    case "REMOVE_TAGS":
      return {
        ...state,
        tags: state.tags.filter((_, index) => index !== action.payload),
      };

    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, ""],
      };

    case "UPDATE_FEATURE":
      const updateFeature = state.features.map((feature, index) =>
        index === action.payload.index ? action.payload.value : feature
      );

      return {
        ...state,
        features: updateFeature,
      };
    case "REMOVE_FEATURES":
      return {
        ...state,
        features: state.features.filter((_, index) => index !== action.payload),
      };

    default:
      return state;
  }
};
