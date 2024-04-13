local activeCallback = function() return false end

---Start the Hacking minigame
---@param items any
---@param timeToLoot number
---@param callback function
---@param size any
---@return unknown
function StartLooting(items, timeToLoot, size, callback)
    if ActiveMinigamePromise then return end
    ToggleNuiFrame(true)
    SendUIMessage("openPage", {
        page = "looting",
        options = {
            itemList = items, 
            timeToLoot = timeToLoot,
            size = size
        }
    })
    activeCallback = callback

    ActiveMinigamePromise = promise:new()
    return Citizen.Await(ActiveMinigamePromise)
end

RegisterNuiCallback("lootItem", function(data, cb)
    cb(activeCallback(data.index))
end)


exports("StartLooting", StartLooting)

RegisterCommand("trylooting", function()
    StartLooting({
        ["1"] = {item = "lockpick", amount = 5}, ["4"] = {item = "lockpick", amount = 5}
    }, 3000, {x = 3, y = 3}, function(index) 
        print(index)
        return true 
    end)
end)