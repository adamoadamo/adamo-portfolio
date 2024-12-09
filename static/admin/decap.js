// Register the preview style using the latest processed CSS
CMS.registerPreviewStyle("/scss/main.min.c8ee44dfcd56d5806244588cc4514f420bd645452027c965988b8f0d1a761caf37c665ecdc704d54470eed3aaae9a3dd0ec0bb651330d6281055ad5b4dffe2b0.css");

// Add custom styles for the preview
CMS.registerPreviewStyle(`
    .image-item.navigable-item.active img,
    .image-item.navigable-item.active video {
        max-width: clamp(600px, 45vw, 100vw);
        max-height: clamp(600px, 45vw, 100vh);
        object-fit: contain;
        margin: 0 auto;
        display: block;
    }

    .image-item.navigable-item.active {
        width: 100%;
    }

    .image-item.navigable-item.active .image-caption {
        margin: 0;
        width: 100%;
        padding: 0 var(--space-unit);
        box-sizing: border-box;
    }

    .image-fig {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        align-items: baseline;
    }
`);

// Helper function to process markdown and preserve HTML entities
function processContent(content) {
    if (!content) return '';
    // First convert markdown to HTML
    var html = marked.parse(content);
    return html;
}

// Helper function to check if a file is a video
function isVideo(filename) {
    if (!filename || typeof filename !== 'string') return false;
    return /\.(mp4|webm|ogg)$/i.test(filename);
}

var WorkPreview = createClass({
    componentDidMount: function() {
        this.initVideoPlayers();
    },

    componentDidUpdate: function() {
        this.initVideoPlayers();
    },

    initVideoPlayers: function() {
        if (window.videojs) {
            document.querySelectorAll('.video-js').forEach(function(video) {
                if (!video.player) {
                    videojs(video);
                }
            });
        }
    },

    render: function() {
        var entry = this.props.entry;
        var getAsset = this.props.getAsset;
        var body = this.props.widgetFor('body');
        var content = body ? processContent(body.props.value) : '';
        var resources = entry.getIn(['data', 'resources']);
        
        return h('div', {"className": "container"},
            h('main', {},
                resources && resources.toJS && h('div', {"className": "project-images"},
                    resources.toJS().map(function(resource, index) {
                        try {
                            if (!resource || !resource.src) return null;
                            
                            // Get the asset URL safely
                            let url = '';
                            try {
                                const asset = getAsset(resource.src);
                                url = asset ? asset.toString() : '';
                            } catch (e) {
                                console.warn('Error getting asset:', e);
                                return null;
                            }
                            
                            if (!url) return null;
                            
                            const isVideoFile = isVideo(resource.src.toString());
                            const title = entry.getIn(['data', 'title']);
                            const year = entry.getIn(['data', 'year']);
                            const role = entry.getIn(['data', 'role']);
                            const collaborators = entry.getIn(['data', 'collaborators']);
                            
                            return h('div', {"key": index, "className": "flex-item", "tabIndex": "0"},
                                h('div', {"className": "image-item navigable-item active"},
                                    h('div', {"className": "image-background"},
                                        isVideoFile ? 
                                            h('div', {"className": "video-container"},
                                                h('video', {
                                                    "id": `video-${index}`,
                                                    "className": "video-js vjs-default-skin video-item",
                                                    "controls": true,
                                                    "autoplay": false,
                                                    "muted": true,
                                                    "loop": true,
                                                    "preload": "auto",
                                                    "data-setup": '{}'
                                                }, 
                                                    h('source', {
                                                        "src": url,
                                                        "type": "video/mp4"
                                                    })
                                                )
                                            ) :
                                            h('img', {
                                                "src": url,
                                                "alt": resource.alt || '',
                                                "className": "lazy"
                                            })
                                    ),
                                    h('div', {"className": "image-caption"},
                                        h('div', {"className": "image-content"},
                                            h('div', {"className": "image-fig"},
                                                year && h('span', {"className": "year-pill"}, year),
                                                h('em', {}, title),
                                                role && h('span', {}, `(${role})`),
                                                collaborators && h('span', {}, `w/ ${collaborators}`)
                                            )
                                        ),
                                        content && h('div', {
                                            "className": "project-description",
                                            "dangerouslySetInnerHTML": { __html: content }
                                        })
                                    )
                                )
                            );
                        } catch (e) {
                            console.warn('Error rendering resource:', e);
                            return null;
                        }
                    }).filter(Boolean)
                )
            )
        );
    }
});

var BioPreview = createClass({
    render: function() {
        var entry = this.props.entry;
        var body = this.props.widgetFor('body');
        var content = body ? processContent(body.props.value) : '';
        
        return h('div', {"className": "container"},
            h('main', {},
                h('div', {"className": "bio"},
                    h('div', {"className": "bio-content"},
                        h('div', {
                            dangerouslySetInnerHTML: {
                                __html: content
                            }
                        })
                    )
                )
            )
        );
    }
});

var FooterPreview = createClass({
    render: function() {
        var body = this.props.widgetFor('body');
        var content = body ? processContent(body.props.value) : '';
        
        return h('div', {"className": "container"},
            h('footer', {"className": "footer"},
                h('div', {
                    dangerouslySetInnerHTML: {
                        __html: content
                    }
                })
            )
        );
    }
});

CMS.registerPreviewTemplate('bio', BioPreview);
CMS.registerPreviewTemplate('footer', FooterPreview);
CMS.registerPreviewTemplate('projects', WorkPreview); 