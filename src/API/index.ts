import axios from 'axios';


// Types
interface ICategory {
  count: number;
  categories: string[];
}

interface IBlocks {
  count: number;
  blocks: string[];
}


interface IView {
  id: number;
  time: number;
}

interface IViews {
  count: number;
  minutes: IView[];
}


// Config
const headers = {
  'Content-Type': 'application/json',
}

// Requests
export const getCategories = async () => {
  try {
    const response = await axios.get<ICategory>(
      'https://rpback.com/api/games/test_categories?project_id=2',
      { headers: headers }
    );
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getViews = async () => {
  try {
    const response = await axios.get<IViews>(
      'https://rpback.com/api/games/test_minutes?project_id=2',
      { headers: headers }
    );
    return response.data;
  } catch (e) {
    console.log(e)
  }
}

export const getBlocks = async () => {
  try {
    const response = await axios.get<IBlocks>(
      'https://rpback.com/api/games/test_blocks?project_id=2',
      { headers: headers }
    );
    return response.data;
  } catch (e) {
    console.log(e)
  }
}
