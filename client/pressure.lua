local winding = false
local value = 0
local currentSpeed = 1

---Start the Pressure Bar minigame
---@param breakLine number
---@param speed number
---@return unknown
function StartPressureBar(breakLine, speed)
    if ActiveMinigamePromise then return end
    ToggleNuiFrame(true)
    SendUIMessage("openPage", {
        page = "pressure",
        options = {
            breakLine = breakLine
        }
    })
    winding = false
    value = 0
    currentSpeed = speed and speed or 1
    ActiveMinigamePromise = promise:new()

    Citizen.CreateThread(function()
        while ActiveMinigamePromise and value < 100 do
            if winding then
                value = value + currentSpeed
            end

            Citizen.Wait(100)
        end
        if ActiveMinigamePromise then 
            ActiveMinigamePromise:resolve(true)
            ActiveMinigamePromise = nil
            ToggleNuiFrame(false)
        end
    end)

    return Citizen.Await(ActiveMinigamePromise)
end

RegisterNUICallback('windPressureValue', function(_, cb)
    winding = true
    cb(true)
end)

RegisterNUICallback('unwindPressureValue', function(_, cb)
    winding = false
    cb(true)
end)

RegisterNUICallback('breakPressure', function(_, cb)
    if ActiveMinigamePromise then
        ActiveMinigamePromise:resolve(false)
        ActiveMinigamePromise = nil
    end
    cb(true)
    ToggleNuiFrame(false)
end)

exports("StartPressureBar", StartPressureBar)