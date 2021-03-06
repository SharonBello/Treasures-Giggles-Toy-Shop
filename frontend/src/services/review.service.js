import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import {userService} from './user.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'
import {removeReview, addReview} from '../store/actions/review.action.js'


const reviewChannel = new BroadcastChannel('reviewChannel')

export const reviewService = {
  add,
  query,
  remove,
}


function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  var  queryStr = ''
  if(filterBy){
    queryStr ='?'
    if (filterBy.byToyId)  queryStr += `byToyId=${filterBy.byToyId}&` 
    if (filterBy.user)  queryStr += `byUserId=${filterBy.user}` 
  }
  


  console.log('queryStr', queryStr)
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  // await storageService.remove('review', reviewId)
//   reviewChannel.postMessage(removeReview(reviewId))
  
  
}
async function add(review) {
    const addedReview = await httpService.post(`review`, review)
    console.log('review.service.js reviewAdd:', addedReview)
  
  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = await storageService.post('review', review)
  
//   reviewChannel.postMessage(addReview(addedReview))
  return addedReview
}

