import algoSdk from "../../../app/algoSdk"

function toDateTime(secs) {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t.toLocaleString();
}

export const getListOfNames = async(address) => {
  const options = {
      socials: true,
      metadata: true, 
      limit: 20
  }

  const details = {}
  let list = []
  details["address"] = address
  details["info"] = list

  let names = await algoSdk.address(address).getNames(options)
  
  names.forEach((value) => {
      let social_obj = {}
      social_obj["AlgoName"] = value.name
      value.socials.forEach((key) => {
          social_obj[key.key] = key.value
      })
      value.metadata.forEach((key) => {
          if (key.key === 'expiry') social_obj[key.key] = toDateTime(key.value)
      })
      details.info.push(social_obj)
  })  
  return details
}
