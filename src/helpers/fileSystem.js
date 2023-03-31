import { ArraybufferUtils } from '../utils/ArrayBufferUtils'

const FileSystem = {}
FileSystem.writeFileArrayBuffer = function(fname, data, sync, onFinish) {

        var blob = new Blob([data]);

        var download = document.createElement("a");
        download.download = fname;
        download.href = window.URL.createObjectURL(blob);
        download.onclick = function()
        {
            document.body.removeChild(this);
        };
        download.style.display = "none";
        document.body.appendChild(download);
        download.click();

        if (onFinish !== undefined)
        {
            onFinish();
        }
}
FileSystem.readFileArrayBuffer = function(fname, sync, onLoad, onProgress, onError) {

        var file = new XMLHttpRequest();
        file.open("GET", fname, !sync);
        file.overrideMimeType("text/plain; charset=x-user-defined");

        if (onLoad !== undefined)
        {
                file.onload = function()
                {
                        onLoad(ArraybufferUtils.fromBinaryString(file.response));
                };
        }

        if (onProgress !== undefined)
        {
                file.onprogress = onProgress;
        }
        if (onError !== undefined)
        {
                file.onerror = onError;
        }

        file.send(null);

        return sync === true ? ArraybufferUtils.fromBinaryString(file.response) : null;
}
FileSystem.chooserFile = (onLoad, filter, saveas, multiFile) => {
        var chooser = document.createElement("input");
        chooser.type = "file";
        chooser.style.display = "none";
        document.body.appendChild(chooser);

        if (filter !== undefined)
        {
                chooser.accept = filter;
        }

        if (multiFile === true)
        {
                chooser.multiple = true;
        }

        chooser.onchange = function()
        {
                if (onLoad !== undefined)
                {
                        onLoad(chooser.files);
                }

                document.body.removeChild(chooser);
        };

        if (saveas !== undefined)
        {
                chooser.nwsaveas = saveas !== true ? saveas : "file";
        }

        chooser.click();
}

export { FileSystem }