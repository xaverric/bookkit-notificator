const processPages = (pages, configuration) => {
    return pages
        .map(page => _transformPageAndFilterSectionWithinTimeOffset(page, configuration))
        .flatMap(_transformToSectionArray)
        .sort(_sortByTime)
}

const processPagesLight = (pages, configuration) => {
    return pages
        .map(_transformPageAndFilterSectionWithinTimeOffsetLight)
        .filter(item => _isWithinTimeOffset(item, configuration))
        .sort(_sortByTime);
}

const _transformPageAndFilterSectionWithinTimeOffset = (page, configuration) => {
    return {
        name: page?.name?.en || "Unknown Name",
        pageCode: page?.code || "Unknown Code",
        sections: page?.body
            ?.map(_resolveSectionItem)
            ?.filter(section => _isWithinTimeOffset(section, configuration)) || []
    }
}

const _transformPageAndFilterSectionWithinTimeOffsetLight = (page) => {
    const createdTime = new Date(page.sys.cts);
    const modifiedTime = page.sys.mts && createdTime.getTime() !== new Date(page.sys.mts).getTime() ? new Date(page.sys.mts) : null;
    return {
        name: page?.name?.en || "Unknown Name",
        pageCode: page?.code || "Unknown Code",
        created: createdTime,
        modified: modifiedTime
    }
}

const _resolveSectionItem = bodyItem => {
    const createdTime = new Date(bodyItem.sys.cts);
    const modifiedTime = bodyItem.sys.mts && createdTime.getTime() !== new Date(bodyItem.sys.mts).getTime() ? new Date(bodyItem.sys.mts) : null;
    return {
        code: bodyItem.code,
        created: createdTime,
        modified: modifiedTime,
        uuIdentityName: bodyItem.uuIdentityName,
        uuIdentity: bodyItem.uuIdentity
    }
}

const _isWithinTimeOffset = (item, configuration) => {
    return item.modified > configuration.notifications.timeFrom || item.created > configuration.notifications.timeFrom
}

const _transformToSectionArray = page => {
    return page.sections
        .map(section => {
            return {
                name: page.name,
                pageCode: page.pageCode,
                ...section
            }
        });
}

const _sortByTime = (a, b) => {
    return a?.modified?.getTime() < b?.modified?.getTime() ? -1 : a?.modified?.getTime() > b?.modified?.getTime() ? 1 : 0;
}

module.exports = {
    processPages,
    processPagesLight
}